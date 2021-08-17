import { Injectable } from '@angular/core';
import { ApiService } from '../core/_core.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LikeModel} from '../../model/like/like.model';
import {map} from 'rxjs/operators';

const apiUrl = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})

export class PostsService {
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;
  constructor(private apiService: ApiService,
              private httpClient: HttpClient) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }
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
    return this.apiService.get(path).pipe(
      map(response => response.body)
    );
  }
  deletePosts(id: any): Observable<any>{
    const path = `${apiUrl}/api/posts/${id}`;
    return this.apiService.delete(path);
  }
  getLike(id: any): Observable<any>{
    const path = `${apiUrl}/api/post/likes/${id}`;
    // @ts-ignore
    return this.apiService.get<LikeModel>(path).pipe(
      map(response => response.body)
    );
  }
  postLike(postID: any): Observable<any>{
    const path = `${apiUrl}/api/post/likes`;
    return this.apiService.post(path, postID);
  }
  DeleteLike(id: any): Observable<any>{
    const path = `${apiUrl}/api/post/likes/${id}`;
    return this.apiService.delete(path);
  }
  getComments(id: any): Observable<any>{
    const path = `${apiUrl}/api/post/comments/${id}`;
    return this.apiService.get(path).pipe(
      map(response => response.body)
    );
  }
  postComments(data: any): Observable<any>{
    const path = `${apiUrl}/api/post/comments`;
    return this.apiService.post(path, data);
  }
  putComments(id: any, data: any): Observable<any>{
    const path = `${apiUrl}/api/post/comments/${id}`;
    return this.apiService.put(path, data);
  }
  deleteComment(id: any, bodyComments: any): Observable<any>{
    const path = `${apiUrl}/api/post/comments/${id}`;
    return this.apiService.deleteBody(path, bodyComments);
  }
  getTrendingPosts(): Observable<any>{
    const path = `${apiUrl}/api/posts/likes/trending`;
    return this.apiService.get(path).pipe(
      map(response => response.body)
    );
  }
  getByCategory(theme: any): Observable<any>{
    const path = `${apiUrl}/api/posts/theme/${theme}`;
    return this.apiService.get(path).pipe(
      map(res => res.body)
    );
  }
}
