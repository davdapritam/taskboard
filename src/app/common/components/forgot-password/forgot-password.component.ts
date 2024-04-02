import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup;
  stepOne: boolean = true;
  stepTwo: boolean = false;

  userId: string = "";
  mobileNo: string = "";

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private ActivatedRoute: ActivatedRoute,
    private toastrService: ToastrService) {

  }

  ngOnInit(): void {

    this.ActivatedRoute.params.subscribe(params => {
      this.userId = params['id'];
      this.mobileNo = params['number'];
      if (this.userId && this.mobileNo) {
        this.stepOne = false;
        this.stepTwo = true;
      }
    });
    this.initForgotPasswordForm();
  }

  checkUser() {
    const mobileNo = this.forgotForm.get('mobileNo')?.value
    if (mobileNo) {
      this.authService.checkUser(mobileNo).subscribe((res) => {
        if (res && res.Status == 1) {
          window.open(`http://localhost:4200/forgotPassword/${mobileNo}/${res.data}`)
        }
      })
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }

  initForgotPasswordForm() {
    this.forgotForm = this.fb.group({
      mobileNo: new FormControl(this.mobileNo ? String(this.mobileNo) : '', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  updatePassword() {
    const data = this.forgotForm.value;
    this.authService.updatePassword(data).subscribe((res) => {
      if (res && res.Status == 1) {
        this.router.navigate(['login']);
        this.toastrService.success(res.message);
      }
    })
  }

  redirectTo(path: string) {
    this.router.navigate([`${path}`]);
  }

}