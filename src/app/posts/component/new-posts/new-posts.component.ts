import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../share/services/posts/posts.service';

@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.scss']
})
export class NewPostsComponent implements OnInit {
  posts: any = [];
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    this.postsService.getPosts().subscribe(
      res => {
        console.log(res);
        this.posts = res.body;
        console.log(this.posts)
      },
      error => {
        console.log(error);
      }
    );
  }
}
