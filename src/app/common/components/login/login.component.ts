import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interface/user';
import { Router } from '@angular/router';
import { Auth } from 'src/app/services/auth';
import { takeWhile } from 'rxjs';

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
  isAlive: boolean = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private auth: Auth) {

  }

  ngOnInit(): void {
    this.initLoginForm();
    this.fetchInformation();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('dpdavdapritam@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('Admin@123', [Validators.required])
    })
  }

  redirectTo(path: string) {
    this.router.navigate([`${path}`]);
  }

  login() {
    const data = this.loginForm.value
    if (this.loginForm.valid) {
      this.auth.login(data);
    }
  }

  fetchInformation() {
    const isAuthenticated$ = this.auth.login()[0];
    const hasErrors$ = this.auth.login()[1];
    const user$ = this.auth.login()[2];

    isAuthenticated$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => this.isAuthenticated = data);
    hasErrors$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => this.hasErrors = data);
    user$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => { this.user = data });
  }
}
