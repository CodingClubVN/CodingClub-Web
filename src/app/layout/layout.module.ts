import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HomeComponent } from './home/home.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  declarations: [
    HomeComponent,
    UploadImgComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule,
    ClipboardModule
  ]
})
export class LayoutModule { }
