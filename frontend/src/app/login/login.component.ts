import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  header: string;
  constructor(
    public fb: FormBuilder,
    private route: Router,
    private us: UserService
  ) {}
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  });

  ngOnInit() {
    this.header = this.route.url === '/login' ? 'Login' : 'Admin login';
  }

  onSubmit() {
    this.us.login(this.loginForm.value);
  }
}
