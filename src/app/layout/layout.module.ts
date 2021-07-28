import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { HomeComponent } from './home/home.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    UploadImgComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LayoutModule { }
