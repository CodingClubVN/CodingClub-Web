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
    return this.apiService.postFormData(path, formData);
  }
  getPosts(): Observable<any>{
    const path = `${apiUrl}/api/posts`;
    return this.apiService.get(path);
  }
  getPostsByUser(user: any): Observable<any>{
    const path = `${apiUrl}/api/posts/${user}`;
    return this.apiService.get(path);
  }
  deletePosts(id: any): Observable<any>{
    const path = `${apiUrl}/api/posts/${id}`;
    return this.apiService.delete(path);
  }
}
