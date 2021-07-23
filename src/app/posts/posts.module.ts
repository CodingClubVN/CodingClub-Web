import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { CategoryComponent } from './component/category/category.component';
import { CreatePostsComponent } from './component/create-posts/create-posts.component';
import { NewPostsComponent } from './component/new-posts/new-posts.component';
import { ListFriendComponent } from './component/list-friend/list-friend.component';
import { TrendingPostComponent } from './component/trending-post/trending-post.component';
import {ReactiveFormsModule} from '@angular/forms';
import { PostsByUserComponent } from './posts-by-user/posts-by-user.component';

@NgModule({
  declarations: [

    CategoryComponent,
    CreatePostsComponent,
    NewPostsComponent,
    ListFriendComponent,
    TrendingPostComponent,
    PostsByUserComponent
  ],
  exports: [
    CategoryComponent,
    CreatePostsComponent,
    NewPostsComponent,
    TrendingPostComponent,
    ListFriendComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule
  ]
})
export class PostsModule { }
