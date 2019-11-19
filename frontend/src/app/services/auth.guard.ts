import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private us: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.us.getIsAuth();
    console.log(isAuth);
    if (!isAuth) {
      this.router.navigate(['/']);
    }
    return isAuth;
  }
}
