import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private us: UserService) {}

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: ['', Validators.required]
  });

  ngOnInit() {}

  onSubmit() {
    this.us.register(this.registerForm.value);
  }
}
