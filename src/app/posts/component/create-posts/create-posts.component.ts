import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../share/services/auth/token-storage.service';
import {PostsService} from '../../../share/services/posts/posts.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {
  selectedFile: any = null;
  token: any = this.tokenStorageService.getToken();
  infoPosts: any;
  constructor( private tokenStorageService: TokenStorageService,
               private postsService: PostsService,
               private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.infoPosts = this.formBuilder.group({
      image: [null],
      status: new FormControl('', Validators.required)
    });
  }

  onFileSelected(event: any): void{
    const file = (event.target.files[0] as File);
    this.infoPosts.get('image').setValue(file);
  }

  onSubmit(): void{
    const fd: any  = new FormData();
    fd.append('token', (this.token as string));
    fd.append('image', this.infoPosts.get('image').value);
    fd.append('status', this.infoPosts.get('status').value);
    this.postsService.createPosts(fd).subscribe(res => {
      console.log(res);
    });
  }
}
