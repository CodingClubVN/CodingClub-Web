import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../share/services/posts/posts.service';
import {TokenStorageService} from '../../share/services/auth/token-storage.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {UserService} from '../../share/services/user/user.service';
import {AuthService} from '../../share/services/auth/auth.service';

@Component({
  selector: 'app-posts-by-user',
  templateUrl: './posts-by-user.component.html',
  styleUrls: ['./posts-by-user.component.scss']
})
export class PostsByUserComponent implements OnInit {
  username: any;
  paramUseranme: any;
  postsByUser: any = [];
  listLike: any = [];
  idPost: any;
  checkLike = false;
  infoComment: any;
  listComment: any = [];
  commentLenght: any;
  renderComment = false;
  checkEditComment = false;
  infoEditComment: any;
  idComment: any;
  user: any;
  @Input() userDetailNewPosts: any;
  checkLogin$: any;
  constructor(private postsService: PostsService,
              private tokenStorageService: TokenStorageService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService) {
    this.username = this.tokenStorageService.getUsername();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.paramUseranme = params.get('user');
    });
    console.log(this.paramUseranme);
    this.initForm();
    this.initFormEditComment();
    this.loadData(this.paramUseranme);
    this.getUser(this.username);
    this.checkLogin();
  }
  initForm(): void{
    this.infoComment = this.formBuilder.group({
      status: new FormControl('')
    });
  }
  // start Render data
  loadData(user: any): void{
    this.postsService.getPostsByUser(user).subscribe(
      res => {
        this.postsByUser = res;
        console.log(this.postsByUser);
        this.postsByUser.forEach((item: { post_id: any; }) => {
          this.getLikeByPosts(item.post_id);
          this.getCommentByID(item.post_id);
        });
        this.sortData();
      },
      error => {
        console.log(error);
      }
    );
  }
  // end Render data
  // start handle delete post
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
  // end handle delete post
  // start handle like
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
  likeEven(postID: any): void{
    let arrayUser: any = [];
    let userLike: Array<any> = [];
    let array = [];
    let arrayUsername: any = [];
    array = this.listLike.filter((item: { post_id: any; array_username: any; }) => {
      if (item.post_id === postID){
        return item.array_username;
      }
    });
    arrayUser = array.map((item: { array_username: any; }) => {
      return item.array_username;
    });
    arrayUser.map((item: any) => userLike = item);
    arrayUsername = userLike.filter(item => {
      if (this.username === item){
        return item;
      }
    });
    if (arrayUsername.length === 0){
      const data = {
        post_id: postID
      };
      this.postsService.postLike(data).subscribe(
        res => {
          this.checkLike = true;
          this.listLike = [];
          this.listComment = [];
          this.loadData(this.paramUseranme);
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    }else{
      this.postsService.DeleteLike(postID).subscribe(
        res => {
          this.checkLike = false;
          this.listLike = [];
          this.listComment = [];
          this.loadData(this.paramUseranme);
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  // end handle like
  // start handle comment
  initFormEditComment(): void{
    this.infoEditComment = this.formBuilder.group({
      newMessage: new FormControl(''),
    });
  }
  get formEdit() {
    return this.infoEditComment.controls;
  }
  get f() {
    return this.infoComment.controls;
  }
  sortData(): void {
    return this.postsByUser.sort((a: { day_post: string | number | Date; }, b: { day_post: string | number | Date; }) => {
      return (new Date(b.day_post) as any) - (new Date(a.day_post) as any);
    });
  }
  sendComment(postID: any): void{
    const dataPost = {
      post_id: postID,
      message: this.f.status.value
    };
    this.postsService.postComments(dataPost).subscribe(
      res => {
        this.listLike = [];
        this.listComment = [];
        this.loadData(this.paramUseranme);
        this.f.status.value = '';
      },
      error => {
        console.log(error);
      }
    );
  }
  getCommentByID(id: any): void{
    this.postsService.getComments(id).subscribe(
      res => {
        this.listComment.push(res);
        this.commentLenght = this.listComment.length;
      },
      error => {
        console.log(error);
      }
    );
  }
  functionRenderComment(): void{
    this.renderComment = true;
  }
  deleteComments(postsID: any, idComment: any): void{
    const dataDelete = {
      id: idComment
    };
    this.postsService.deleteComment(postsID, dataDelete).subscribe(
      res => {
        this.listLike = [];
        this.listComment = [];
        this.loadData(this.paramUseranme);
      },
      error => {
        console.log(error);
      }
    );
  }
  editComment(id: any, message: any): void{
    this.checkEditComment = true;
    this.idComment = id;
    this.formEdit.newMessage.value = message;
  }
  summitEditComment(postsID: any, idComment: any): void{
    const dataEditComment = {
      id: idComment,
      newMessage: this.formEdit.newMessage.value
    };
    this.postsService.putComments(postsID, dataEditComment).subscribe(
      res => {
        this.listLike = [];
        this.listComment = [];
        this.loadData(this.paramUseranme);
        this.checkEditComment = false;
      },
      error => {
        console.log(error);
      }
    );
  }
  // end handle comment
  getUser(username: string): void{
    this.userService.getUserByUsername(username).subscribe(
      res => {
        this.user = res;
        console.log(this.user);
      },
      error => {
        console.log(error);
      }
    );
  }
  checkLogin(): void{
    // @ts-ignore
    this.checkLogin$ = this.authService.isLogiedIn() ? true : false;
  }
}
