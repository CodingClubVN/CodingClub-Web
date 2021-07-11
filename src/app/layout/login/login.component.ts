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

  constructor( private formBuilder: FormBuilder,
               private authService: AuthService,
               private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.infoUser = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.infoUser.controls;
  }

  onSubmit(): void{
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
