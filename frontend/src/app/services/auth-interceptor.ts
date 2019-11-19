import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private autService: UserService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.autService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest);
  }
}
