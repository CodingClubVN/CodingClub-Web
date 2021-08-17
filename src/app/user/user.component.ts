import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {PostsService} from '../share/services/posts/posts.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private postsService: PostsService) {
    this.isLoading$ = this.postsService.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
  }

}
