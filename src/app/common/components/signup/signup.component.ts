import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/services/auth';
import { User } from '../../interface/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  user!: User;
  isAuthenticated: boolean = false;
  hasErrors: boolean = false;
  isAlive: boolean = true;

  constructor(private fb: FormBuilder, private authService: Auth) {

  }

  ngOnInit(): void {
    this.initSignupForm();
  }

  initSignupForm() {
    this.signupForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  signup() {
    const data = this.signupForm.value;

    if (this.signupForm.valid) {
      this.authService.signup(data);
    }
  }
}
