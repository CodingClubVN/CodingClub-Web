import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../../share/services/auth/auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  infoUser: any;

  constructor( private formBuilder: FormBuilder,
               private authService: AuthService) { }

  ngOnInit(): void {
    this.infoUser = this.formBuilder.group({
      oldpassword: new FormControl('', Validators.required),
      newpassword: new FormControl('', Validators.required),
      confirmnewpassword: new FormControl('', Validators.required)
    });
  }
  // tslint:disable-next-line:typedef
  get f() {
    return this.infoUser.controls;
  }

  onSubmit(): void{
  }
}
