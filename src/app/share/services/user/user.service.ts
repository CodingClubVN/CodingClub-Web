import { Injectable } from '@angular/core';
import {ApiService} from '../core/_core.service';
import {Observable} from 'rxjs';
import { environment } from '../../../../environments/environment';
import {map} from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private apiService: ApiService) { }
  getUserByUsername(username: any): Observable<any>{
    const path = `${apiUrl}/api/users/${username}`;
    return this.apiService.get(path).pipe(
      map(res => res.body)
    );
  }
  putUserByUsername(username: any, info: any): Observable<any>{
    const path = `${apiUrl}/api/users/${username}`;
    return this.apiService.putFormdata(path, info);
  }
  getAllUsers(): Observable<any>{
    const path = `${apiUrl}/api/users`;
    return this.apiService.get(path).pipe(
      map(res => res.body)
    );
  }
  searchUser(searchKeyword: string): Observable<any> {
    const path = `${apiUrl}/api/users/search`;
    console.log(searchKeyword);
    return this.apiService.post(path, { key_word: searchKeyword }).pipe(
      map(res => res.body)
    )
  }
  sendFriendRequest(username: string) {
    const path= `${apiUrl}/api/friends/invite`;
    return this.apiService.post(path, { username_friend: username }).pipe(
      map(res => res.body)
    )
  }
  getFriendInvitation(username: string) {
    const path = `${apiUrl}/api/friends/invitations/${username}`;
    return this.apiService.get(path).pipe(
      map(res => res.body)
    )
  }
  cancelFriendRequest(username: string) {
    const path = `${apiUrl}/api/friends/cancel/${username}`;
    return this.apiService.delete(path).pipe(
      map(res => res.body)
    )
  }
}
