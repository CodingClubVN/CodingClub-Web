import { Component, OnInit } from '@angular/core';
import {PostsService} from '../../../share/services/posts/posts.service';

@Component({
  selector: 'app-trending-post',
  templateUrl: './trending-post.component.html',
  styleUrls: ['./trending-post.component.scss']
})
export class TrendingPostComponent implements OnInit {
  listTrendingPosts: any = [];

  constructor( private postsService: PostsService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    this.postsService.getTrendingPosts().subscribe(
      res => {
        this.listTrendingPosts = res;
        console.log(this.listTrendingPosts);
      },
      error => {
        console.log(error);
      }
    );
  }
}
