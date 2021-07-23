import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../share/services/posts/posts.service';

@Component({
  selector: 'app-posts-by-user',
  templateUrl: './posts-by-user.component.html',
  styleUrls: ['./posts-by-user.component.scss']
})
export class PostsByUserComponent implements OnInit {
  username: any;
  postsByUser: any = [];
  constructor(private activatedRoute: ActivatedRoute,
              private postsService: PostsService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.username = params.get('user');
    });
    console.log(this.username);
    this.loadData(this.username);
  }
  loadData(username: any): void{
    this.postsService.getPostsByUser(username).subscribe(
      res => {
        this.postsByUser = res.body;
        console.log(this.postsByUser);
      },
      error => {
        console.log(error);
      }
    );
  }
  // tslint:disable-next-line:typedef
  get sortData() {
    // @ts-ignore
    return this.postsByUser.sort((a, b) => {
      return (new Date(b.day_post) as any) - (new Date(a.day_post) as any);
    });
  }
}
