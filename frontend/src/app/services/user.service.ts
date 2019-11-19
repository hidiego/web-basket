import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.backendUrl + '/users';
  constructor(private http: HttpClient, private sb: MatSnackBar) {}

  register(user: User) {
    this.http.post<any>(this.url + '/register', user).subscribe(
      response => {
        this.sb.open(response.message, 'close', {
          duration: 5000,
          verticalPosition: 'top'
        });
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }
}
