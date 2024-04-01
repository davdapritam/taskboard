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

export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;

  user!: User;
  isAuthenticated: boolean = false;
  hasErrors: boolean = false;
  isAlive: boolean = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private auth: Auth,
    private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.checkUser();
    this.initLoginForm();
    // this.fetchInformation();
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

  // fetchInformation() {
  //   const isAuthenticated$ = this.auth.login()[0];
  //   const hasErrors$ = this.auth.login()[1];
  //   const user$ = this.auth.login()[2];

  //   isAuthenticated$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => this.isAuthenticated = data);
  //   hasErrors$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => this.hasErrors = data);
  //   user$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => { this.user = data });
  // }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
