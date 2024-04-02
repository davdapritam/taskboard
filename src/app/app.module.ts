import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './common/components/login/login.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './common/store/reducer';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './common/components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth } from './services/auth';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileComponent } from './common/components/profile/profile.component';
import { Task } from './services/task';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(rootReducer),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatFormFieldModule
  ],
  providers: [Auth, Task],
  bootstrap: [AppComponent]
})
export class AppModule { }
