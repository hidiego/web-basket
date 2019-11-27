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
  roles: any;
  constructor(private fb: FormBuilder, private us: UserService) {}

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: ['', Validators.required],
    role: ['1', Validators.required],
    playerNumber: ['', Validators.required]
  });

  async ngOnInit() {
    this.roles = await this.us.getRoles();
    console.log(this.roles);
  }

  onSubmit() {
    this.registerForm.value.role = Number(this.registerForm.value.role);
    if (this.registerForm.value.role !== 3) {
      this.registerForm.value.playerNumber = null;
    }
    console.log(this.registerForm.value);
    this.us.register(this.registerForm.value);
  }
}
