import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../../share/services/auth/auth.service';
import { TokenStorageService } from '../../share/services/auth/token-storage.service';
import { Router } from '@angular/router';
import {UserService} from '../../share/services/user/user.service';
import {PostsService} from '../../share/services/posts/posts.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  infoUser: any;
  submitted = false;
  user: any;
  username: any;

  constructor( private formBuilder: FormBuilder,
               private authService: AuthService,
               private tokenStorageService: TokenStorageService,
               private userService: UserService,
               private postsService: PostsService,
               private toastrService: ToastrService) {
    this.username = this.tokenStorageService.getUsername();
  }

  ngOnInit(): void {
    this.initForm();
    this.getUser(this.username);
  }
  initForm(): void{
    this.infoUser = this.formBuilder.group({
      oldpassword: new FormControl('', Validators.required),
      newpassword: new FormControl('',
        [
          Validators.required,
          Validators.minLength(9),
        ]
      ),
      confirmnewpassword: new FormControl('', Validators.required)
    });
  }
  // tslint:disable-next-line:typedef
  get f() {
    return this.infoUser.controls;
  }
  // tslint:disable-next-line:typedef
  get oldpassword() {
    return this.infoUser.get('oldpassword');
  }
  // tslint:disable-next-line:typedef
  get newpassword() {
    return this.infoUser.get('newpassword');
  }
  // tslint:disable-next-line:typedef
  get confirmnewpassword() {
    return this.infoUser.get('confirmnewpassword');
  }
  onSubmit(): void{
    this.submitted = true;
    this.postsService.isLoadingSubject.next(true);
    if (this.f.newpassword.value === this.f.confirmnewpassword.value){
      const infochange = {
        newPassword: this.f.newpassword.value,
        oldPassword: this.f.oldpassword.value
      };
      console.log(infochange);
      this.authService.changePassword(infochange).subscribe(res => {
          this.postsService.isLoadingSubject.next(false);
          this.toastrService.success('Đổi mật khẩu thành công', 'Thông báo !');
          console.log(res);
        },
        error => {
          this.toastrService.error('Đổi mật khẩu thất bại vui lòng thử lại', 'Thông báo !');
          this.postsService.isLoadingSubject.next(false);
          console.log(error);
        });
    }else{
      console.log('ERRO: Fail !');
    }
  }
  getUser(username: string): void{
    this.userService.getUserByUsername(username).subscribe(
      res => {
        this.user = res;
        console.log(this.user);
      },
      error => {
        console.log(error);
      }
    );
  }
}
