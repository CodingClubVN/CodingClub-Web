import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ApiService} from '../core/_core.service';
import {Observable} from 'rxjs';

const apiUrl = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private apiService: ApiService
  ) { }
  postContact(data: any): Observable<any>{
    const path = `${apiUrl}/api/contacts`;
    return this.apiService.post(path, data);
  }
}
