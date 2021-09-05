import { Component, OnInit, Output } from '@angular/core';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import { AuthService } from '../../services/auth/auth.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  search: string = '';
  islogins = false;
  user: any;
  username: any;
  constructor( private tokenStorageService: TokenStorageService,
               private authService: AuthService,
               private userService: UserService) {
    this.username = this.tokenStorageService.getUsername();
  }

  ngOnInit(): void {
    this.addClass();
    this.checkLogin();
    this.getUser(this.username);
  }
  addClass(): void{
    // tslint:disable-next-line:only-arrow-functions typedef
    window.addEventListener('scroll', function(){
      const nav = document.querySelector('nav');
      // @ts-ignore
      nav.classList.toggle('sticky', window.scrollY > 100);
    });
  }
  checkLogin(): void{
   // @ts-ignore
    if (this.authService.isLogiedIn()){
     this.islogins = true;
   }else{
     this.islogins = false;
   }
  }
  logout(): void{
    this.islogins = false;
    this.authService.logout().subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
    this.tokenStorageService.signOut();
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
