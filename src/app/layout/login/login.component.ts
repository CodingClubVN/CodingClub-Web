import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../share/services/auth/auth.service';
import { TokenStorageService } from '../../share/services/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  infoUser: any;
  submitted = false;

  constructor( private formBuilder: FormBuilder,
               private authService: AuthService,
               private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.infoUser = this.formBuilder.group({
      username: new FormControl('',
        [
          Validators.required,
          Validators.pattern('^[A-Z]*[a-z]*\\d*$')
        ]
      ),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(9)
        ])
    });
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.infoUser.controls;
  }
  // tslint:disable-next-line:typedef
  get username() {
    return this.infoUser.get('username');
  }
  // tslint:disable-next-line:typedef
  get password() {
    return this.infoUser.get('password');
  }
  onSubmit(): void{
    this.submitted = true;
    console.log(this.infoUser.getRawValue());
    this.authService.login(this.infoUser.getRawValue()).subscribe(res => {
        console.log(res);
        this.tokenStorageService.saveUsername(this.f.username.value);
        this.tokenStorageService.saveToken(res.body.token);
        this.reload();
      },
      err => {
        console.log(err);
      }
    );
  }
  reload(): void{
    window.location.reload();
  }
}
