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
  userLike: Array<any> = [];
  array: any = [];
  arrayUsername: any = [];
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
        console.log(this.listLike);
      },
      error => {
        console.log(error);
      }
    );
  }

  likeEven(postID: any): void{
    this.array = this.listLike.filter((item: { post_id: any; array_username: any; }) => {
      if (item.post_id === postID){
        return item.array_username;
      }
    });
    console.log(this.array);
    this.arrayUser = this.array.map((item: { array_username: any; }) => {
      return item.array_username;
    });
    console.log(this.arrayUser);
    this.arrayUser.map((item: any) => this.userLike = item);
    console.log(this.userLike);
    this.arrayUsername = this.userLike.filter(item => {
      if (this.username === item){
        return item;
      }
    });
    console.log(this.arrayUsername);
    if (this.arrayUsername.length === 0){
      const data = {
        post_id: postID
      };
      this.postsService.postLike(data).subscribe(
        res => {
          this.listLike = [];
          this.loadData();
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    }else{
      this.postsService.DeleteLike(postID).subscribe(
        res => {
          this.listLike = [];
          this.loadData();
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
