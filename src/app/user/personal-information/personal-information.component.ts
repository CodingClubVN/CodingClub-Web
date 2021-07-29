import { Component, OnInit } from '@angular/core';
import {UserService} from '../../share/services/user/user.service';
import {TokenStorageService} from '../../share/services/auth/token-storage.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  infoUser: any;
  username: any;
  editProfile = false;
  personalInformation: any;
  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getUsername();
    this.getUser(this.username);
  }
  getUsername(): void{
    this.username = this.tokenStorageService.getUsername();
    console.log(this.username);
    console.log(this.tokenStorageService.getUsername());
  }
  getUser(username: any): void{
    this.userService.getUserByUsername(username).subscribe(
      res => {
        this.personalInformation = res.body;
        console.log(this.personalInformation);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(): void{

  }
}
