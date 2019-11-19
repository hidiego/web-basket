import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  header: string;
  constructor(public fb: FormBuilder, private route: Router) {}
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  });

  ngOnInit() {
    this.header = this.route.url === '/login' ? 'Login' : 'Admin login';
  }

  onSubmit() {
    console.warn(this.loginForm.value);
  }
}
