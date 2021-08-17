import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../share/services/auth/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // @ts-ignore
  infoUser: FormGroup;
  submitted = false;

  constructor( private formBuilder: FormBuilder,
               private authService: AuthService,
               private router: Router,
               private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.infoUser = this.formBuilder.group({
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Z]*[a-z]*\\d*$')
          ]),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(9)
        ]),
      firstname: new FormControl('',
        [
          Validators.required,
          Validators.pattern('[A-Z]*[a-z]*')
        ]),
      lastname: new FormControl('',
        [
        Validators.required,
        Validators.pattern('[A-Z]*[a-z]*')
      ]),
      phone: new FormControl('',
        [
          Validators.required,
          Validators.pattern('^0(9|8|7)\\d{8}$')
        ]),
      email: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),
      confirmpassword: new FormControl('', Validators.required)
    });
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.infoUser.controls;
  }
  // tslint:disable-next-line:typedef
  get username(){
    return this.infoUser.get('username');
  }
  // tslint:disable-next-line:typedef
  get firstname(){
    return this.infoUser.get('firstname');
  }
  // tslint:disable-next-line:typedef
  get lastname(){
    return this.infoUser.get('lastname');
  }
  // tslint:disable-next-line:typedef
  get phone(){
    return this.infoUser.get('phone');
  }
  // tslint:disable-next-line:typedef
  get email(){
    return this.infoUser.get('email');
  }
  // tslint:disable-next-line:typedef
  get password(){
    return this.infoUser.get('password');
  }
  // tslint:disable-next-line:typedef
  get confirmpassword(){
    return this.infoUser.get('confirmpassword');
  }

  checkPassword(): boolean{
    console.log(this.f.confirmpassword.value);
    if (this.f.confirmpassword.value === this.f.password.value){
      return true;
    }else{
      return false;
    }
  }

  onSubmit(): void{
    this.submitted = true;
    if (this.checkPassword()){
      const user = {
        username: this.f.username.value,
        password: this.f.password.value,
        firstname: this.f.firstname.value,
        lastname: this.f.lastname.value,
        phone: this.f.phone.value,
        email: this.f.email.value,
      };
      console.log(user);
      this.authService.register(user).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/login']);
          this.toastrService.success('Đăng ký thành công !', 'Thông báo');
        },
        error => {
          console.log(error);
          this.toastrService.error('Đăng ký tài khoản thất bại vui lòng thử lại !', 'Lỗi !!!');
        }
      );
    }else{
      console.log('ERRR: Fail');
    }
  }
}
