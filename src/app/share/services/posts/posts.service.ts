import { Injectable } from '@angular/core';
import { ApiService } from '../core/_core.service';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const apiUrl = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private apiService: ApiService,
              private httpClient: HttpClient) { }
  createPosts(formData: any): Observable<any>{
    const path = `${apiUrl}/api/posts`;
    return this.apiService.postFile(path, formData);
  }
}
