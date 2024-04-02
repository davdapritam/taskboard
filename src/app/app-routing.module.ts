import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common/components/login/login.component';
import { SignupComponent } from './common/components/signup/signup.component';
import { ProfileComponent } from './common/components/profile/profile.component';
import { ForgotPasswordComponent } from './common/components/forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'master',
    loadChildren: () => import('./components/master/master.module').then(
      m => m.MasterModule
    )
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'forgotPassword/:number/:id',
    component: ForgotPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
