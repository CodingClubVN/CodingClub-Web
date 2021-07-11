import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../share/services/auth/auth.service';
import { TokenStorageService } from '../../share/services/auth/token-storage.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  infoUser: any;

  constructor( private formBuilder: FormBuilder,
               private authService: AuthService,
               private tokenStorageService: TokenStorageService,
               private router: Router,
               private location: Location) { }

  ngOnInit(): void {
    this.infoUser = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void{
    console.log(this.infoUser.getRawValue());
    this.authService.login(this.infoUser.getRawValue()).subscribe(res => {
        // console.log(res.body.access_token);
        console.log(res);
        this.tokenStorageService.saveToken(res.body.token);
        this.reload();
        // this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    );
  }
  reload(): void{
    this.location.replaceState('/home');
    window.location.reload();
  }
}
