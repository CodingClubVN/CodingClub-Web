import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../share/services/posts/posts.service';
import {TokenStorageService} from '../../../share/services/auth/token-storage.service';

@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.scss']
})
export class NewPostsComponent implements OnInit {
  posts: any = [];
  listLike: any = [];
  idPost: any;
  checkLike = false;
  username: any;
  arrayUser: any = [];
  userLike: any = [];
  constructor(private postsService: PostsService,
              private tokenStorageService: TokenStorageService) {
    this.username = this.tokenStorageService.getUsername();
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    this.postsService.getPosts().subscribe(
      res => {
        this.posts = res.body as string[];
        this.posts.forEach((item: { post_id: any; }) => this.getLikeByPosts(item.post_id));
      },
      error => {
        console.log(error);
      }
    );
  }
  // tslint:disable-next-line:typedef
  get sortData() {
    // @ts-ignore
    return this.posts.sort((a, b) => {
      return (new Date(b.day_post) as any) - (new Date(a.day_post) as any);
    });
  }

  deletePosts(id: any): void{
    this.postsService.deletePosts(id).subscribe(
      res => {
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }
  getLikeByPosts(id: any): void{
    this.postsService.getLike(id).subscribe(
      res => {
        this.listLike.push(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  likeEven(id: any): void{
    this.listLike.map((item: { array_username: any; }) => {
      if (item.array_username.length !== 0){
        this.arrayUser = item.array_username;
      }
    });
    this.userLike = this.arrayUser.filter((item: any) => this.username = item);
    if (this.userLike.length !== 0){
      this.postsService.DeleteLike(id).subscribe(
        res => {
          this.loadData();
        },
        error => {
          console.log(error);
        }
      );
    }else{
      const data = {
        post_id: id
      };
      this.postsService.postLike(data).subscribe(
        res => {
          this.loadData();
        },
        error => {
          console.log(error);
        }
      );

    }
  }
}
