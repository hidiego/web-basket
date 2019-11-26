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
  url = environment.backendUrl + '/users';
  private isAuthenticated = false;
  token = null;
  user: User;
  email: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<any>();
  constructor(
    private http: HttpClient,
    private sb: MatSnackBar,
    private router: Router
  ) {}

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
    this.http.post<any>(this.url + '/register', user).subscribe(
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
    this.http.post<any>(this.url + '/login', form).subscribe(
      response => {
        console.log(response);
        this.token = response.data.token;
        if (this.token) {
          const expiresIn = response.data.expiresIn;
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

  getUserDB(email: string): any {
    this.http.get<any>(this.url + '/getUser/' + email).subscribe(response => {
      return response.data;
    });
  }

  async autoAuthUser() {
    const authInfo = this.getAuthData();
    console.log(authInfo);
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expiration.getTime() - now.getTime();
    console.log(expiresIn);
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.email = authInfo.email;
      this.user = this.getUserDB(this.email);
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
    const message = `Tu sesion estará activa ${Math.floor(
      expiresIn / 60000
    )} minutos`;
    this.showSnakBar(message);
  }

  private setAuthTimer(duration: number) {
    console.log('SET AUTH TIMER');
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
    console.log('CLEAR AUTH DATA');
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('email');
  }

  private saveAuthData(token: string, expirationDate: Date, email: string) {
    console.log('SAVE AUTH DATA');
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    console.log(email);
    localStorage.setItem('email', email);
    const emailtmp = localStorage.getItem('email');
    console.log(emailtmp);
  }

  private getAuthData() {
    console.log('GET AUTH DATA');
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
