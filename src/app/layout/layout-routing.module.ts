import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from './layout.component';
import {HomeComponent} from './home/home.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ChangePasswordComponent} from '../user/change-password/change-password.component';
import {AuthGuard} from '../share/services/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'upload',
        component: UploadImgComponent
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
