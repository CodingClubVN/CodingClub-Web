import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from './user.component';
import {PersonalInformationComponent} from './personal-information/personal-information.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        redirectTo: 'personalinformation',
        pathMatch: 'full'
      },
      {
        path: 'personalinformation',
        component: PersonalInformationComponent
      },
      {
        path: 'changepassword',
        component: ChangePasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
