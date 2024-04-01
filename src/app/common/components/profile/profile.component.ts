import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/services/auth';
import { GetUser } from '../../interface/user';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm !: FormGroup;

  user!: GetUser;
  isLoading = false;
  isLoaded = false;
  isAlive: boolean = true;

  constructor(private auth: Auth, private fb: FormBuilder) {

  }

  initProfileForm() {
    this.profileForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.initProfileForm();
    this.fetchUser();
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  fetchUser() {

    const isLoading$ = this.auth.getUserById()[0];
    const isLoaded$ = this.auth.getUserById()[1];
    const user$ = this.auth.getUserById()[2];

    isLoading$.pipe(takeWhile(() => this.isAlive)).subscribe((data: any) => {
      this.isLoading = data

    });
    isLoaded$.pipe(takeWhile(() => this.isAlive)).subscribe((data: any) => this.isLoaded = data);
    user$.pipe(takeWhile(() => this.isAlive)).subscribe((data: any) => {
      this.user = data
      console.log("this.user", this.user)
      if (this.user.firstName == '') {
        this.getUserById();
      } else {
        this.profileForm.get('firstName')?.setValue(this.user.firstName)
        this.profileForm.get('lastName')?.setValue(this.user.lastName)
        this.profileForm.get('mobileNo')?.setValue(this.user.mobileNo)
        this.profileForm.get('email')?.setValue(this.user.email)
        this.profileForm.get('password')?.setValue(this.user.password)
      }
    });

  }

  getUserById() {

    const user = localStorage.getItem('upmetricsCred')
    if (user) {
      const id = JSON.parse(user).id

      this.auth.getUserById(id, true);
    }
  }

  imageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.readAndDisplayImage(file);
    }
  }

  readAndDisplayImage(file: File): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        this.imageUrl = e.target.result.toString();
      }
    };
    reader.readAsDataURL(file);
  }
}
