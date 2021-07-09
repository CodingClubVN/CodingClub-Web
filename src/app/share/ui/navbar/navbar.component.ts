import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../services/auth/emitters/emitters';
import { TokenStorageService } from '../../services/auth/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  islogins = false;

  constructor( private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.addClass();
    this.checkLogin();
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
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        console.log(auth);
        this.islogins = auth;
      }
    );
  }

  logout(): void{
    this.islogins = false;
    this.tokenStorageService.signOut();
  }
}
