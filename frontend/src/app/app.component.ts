import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'leones';
  mode = 'over';
  isAuth = false;
  private authListenerSubs: Subscription;
  constructor(private us: UserService) {}
  ngOnInit() {
    this.us.autoAuthUser();
    this.isAuth = this.us.getIsAuth();
    this.authListenerSubs = this.us
      .getAuthStatusListener()
      .subscribe(isAuth => {
        this.isAuth = isAuth;
      });
  }

  onLogout() {
    this.us.logout();
  }
}
