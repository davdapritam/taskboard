import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interface/user';
import { Router } from '@angular/router';
import { Auth } from 'src/app/services/auth';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  user!: User;
  isAuthenticated: boolean = false;
  hasErrors: boolean = false;

  showPassword: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private auth: Auth,
    private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.checkUser();
    this.initLoginForm();
  }

  checkUser() {
    const user = localStorage.getItem('upmetricsCred')
    if (user) {
      this.sharedService.user = JSON.parse(user);
      this.router.navigate(['master']);
    }
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  redirectTo(path: string) {
    this.router.navigate([`${path}`]);
  }

  login() {
    const data = this.loginForm.value
    if (this.loginForm.valid) {
      this.auth.login(data, true);
    }
  }

  toggleEye() {
    this.showPassword = !this.showPassword;
  }
}
