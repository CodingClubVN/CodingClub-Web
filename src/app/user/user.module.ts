import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SidebarUserComponent } from './component/sidebar-user/sidebar-user.component';


@NgModule({
  declarations: [
    PersonalInformationComponent,
    ChangePasswordComponent,
    SidebarUserComponent,
  ],
  exports: [
    SidebarUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
