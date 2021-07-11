import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../share/services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // @ts-ignore
  infoUser: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private authService: AuthService,
               private router: Router) { }

  ngOnInit(): void {
    this.infoUser = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      fullname: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required)
    });
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.infoUser.controls;
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
    if (this.checkPassword()){
      const user = {
        username: this.f.username.value,
        password: this.f.password.value,
        fullname: this.f.password.value,
        dob: this.f.password.value,
        phone: this.f.password.value,
      };
      console.log(user);
      this.authService.register(user).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
        }
      );
    }else{
      console.log('ERRR: Fail');
    }
  }
}
