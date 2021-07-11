import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  islogins = false;
  constructor( private tokenStorageService: TokenStorageService,
               private authService: AuthService) { }

  ngOnInit(): void {
    this.addClass();
    this.checkLogin();
    console.log(this.islogins);
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
    this.tokenStorageService.signOut();
  }
}
