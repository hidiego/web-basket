import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = environment.backendUrl + '/users';
  private roleUrl = environment.backendUrl + '/roles';
  private isAuthenticated = false;
  private token = null;
  private user: User;
  private email: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<any>();
  constructor(private http: HttpClient, private sb: MatSnackBar, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUser() {
    return this.user;
  }

  getEmail() {
    return this.email;
  }

  register(user: User) {
    this.http.post<any>(this.userUrl + '/register', user).subscribe(
      response => {
        this.sb.open(response.message, 'close', {
          duration: 5000,
          verticalPosition: 'top'
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  login(form: { email: string; password: string }) {
    this.http.post<any>(this.userUrl + '/login', form).subscribe(
      response => {
        console.log(response);
        this.token = response.data.token;
        if (this.token) {
          const expiresIn = response.data.expiresIn;
          this.email = response.data.user.email;
          this.setAuthTimer(expiresIn);
          this.isAuthenticated = true;
          this.user = response.data.user;
          this.authStatusListener.next(true);
          const now = new Date();
          const expiration = new Date(now.getTime() + expiresIn * 1000);
          this.saveAuthData(this.token, expiration, this.user.email);
          this.router.navigate(['/dashboard']);
        }
        this.showSnakBar(response.message);
      },
      error => {
        console.error(error);
        this.authStatusListener.next(false);
      }
    );
  }

  async getUserDB(email: string) {
    return this.http
      .get<any>(this.userUrl + '/getUser/' + email)
      .toPromise()
      .then(response => {
        this.user = response.data;
        return response.data;
      });
  }

  // ROLES
  async getRoles() {
    return this.http
      .get<any>(this.roleUrl + '/all')
      .toPromise()
      .then(response => {
        return response.data;
      });
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expiration.getTime() - now.getTime();
    if (expiresIn > 0) {
      console.log('AUTO AUTH');
      this.token = authInfo.token;
      this.email = authInfo.email;
      this.getUserDB(this.email);
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
    const message = `Tu sesion estará activa ${Math.floor(expiresIn / 60000)} minutos`;
    this.showSnakBar(message);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
    const message = `Se ha cerrado la sesion`;
    this.showSnakBar(message);
    this.authStatusListener.next(false);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('email');
  }

  private saveAuthData(token: string, expirationDate: Date, email: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('email', email);
    const emailtmp = localStorage.getItem('email');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const email = localStorage.getItem('email');
    if (!token || !expiration || !email) {
      return;
    }
    return {
      token,
      expiration: new Date(expiration),
      email
    };
  }

  showSnakBar(message: string) {
    this.sb.dismiss();
    this.sb.open(message, 'close', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }
}
