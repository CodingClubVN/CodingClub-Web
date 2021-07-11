import { Injectable } from '@angular/core';
import { ApiService } from '../core/_core.service';
import {Observable} from 'rxjs';
import { environment } from '../../../../environments/environment';
import {HttpResponse} from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { UserModel } from '../../model/account/user.model';

const apiUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private apiService: ApiService) { }

  login(infoUser: any): Observable<any> {
    const url = `${apiUrl}/api/auth/login`;
    return this.apiService.post(url, infoUser);
  }
  register(infoUser: UserModel): Observable<any> {
    const url = `${apiUrl}/api/auth/register`;
    return this.apiService.post(url, infoUser);
  }
  // test json-server-authentication => success
  // getProducts(): Observable<any> {
  //   const url = `${apiUrl}/products`;
  //   return this.apiService.get(url);
  // }
}
