import { Injectable } from '@angular/core';
import {ApiService} from '../core/_core.service';
import {Observable} from 'rxjs';
import { environment } from '../../../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private apiService: ApiService) { }
  getUserByUsername(username: any): Observable<any>{
    const path = `${apiUrl}/api/users/${username}`;
    return this.apiService.get(path);
  }
}
