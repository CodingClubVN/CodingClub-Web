import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService,
               private router: Router) {
  }

  // tslint:disable-next-line:typedef
  canActivate(){
    // @ts-ignore
    if (this.authService.isLogiedIn()){
      this.router.navigate(['/']);
    }
    // @ts-ignore
    return !this.authService.isLogiedIn();
  }

}
