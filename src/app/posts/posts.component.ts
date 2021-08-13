import { Component, OnInit } from '@angular/core';
import {UserService} from '../share/services/user/user.service';
import {TokenStorageService} from '../share/services/auth/token-storage.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  username: any;
  user: any;
  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService) {
    this.username = this.tokenStorageService.getUsername();
  }

  ngOnInit(): void {
    this.getUser(this.username);
    this.addClass();
  }
  addClass(): void{
    // tslint:disable-next-line:only-arrow-functions typedef
    window.addEventListener('scroll', function(){
      const nav = document.querySelector('.section-right');
      // @ts-ignore
      nav.classList.toggle('sticky', window.scrollY > 100);
    });
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
