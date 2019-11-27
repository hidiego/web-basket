import { Component, OnInit, AfterContentInit } from '@angular/core';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;
  constructor(private us: UserService) {}

  async ngOnInit() {
    console.log('EMAIL', this.us.getEmail());
    this.user = await this.us.getUserDB(this.us.getEmail());
    console.log(this.user);
  }
}
