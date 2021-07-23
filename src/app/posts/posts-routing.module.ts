import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent} from './posts.component';
import {PostsByUserComponent} from './posts-by-user/posts-by-user.component';
import {NewPostsComponent} from './component/new-posts/new-posts.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    children:
      [
        {
          path: '',
          redirectTo: 'new',
          pathMatch: 'full'
        },
        {
          path: 'new',
          component: NewPostsComponent
        },
        {
          path: 'new/:user',
          component: PostsByUserComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
