import {Component, Input, OnInit} from '@angular/core';
import { TokenStorageService } from '../../../share/services/auth/token-storage.service';
import {PostsService} from '../../../share/services/posts/posts.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../../share/services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {
  isLogins = false;
  selectedFile: any = null;
  token: any = this.tokenStorageService.getToken();
  infoPosts: any;
  @Input() userDetailCreatePosts: any;
  constructor( private tokenStorageService: TokenStorageService,
               private postsService: PostsService,
               private formBuilder: FormBuilder,
               private authService: AuthService,
               private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.checkLogin();
    this.infoPosts = this.formBuilder.group({
      image: [null],
      status: new FormControl('', Validators.required)
    });
  }

  onFileSelected(event: any): void{
    const file = (event.target.files[0] as File);
    this.infoPosts.get('image').setValue(file);
  }

  checkLogin(): void{
    // @ts-ignore
    if (this.authService.isLogiedIn()){
      this.isLogins = true;
    }else{
      this.isLogins = false;
    }
  }

  onSubmit(): void{
    this.postsService.isLoadingSubject.next(true);
    const fd: any  = new FormData();
    fd.append('image', this.infoPosts.get('image').value);
    fd.append('status', this.infoPosts.get('status').value);
    this.postsService.createPosts(fd).subscribe(res => {
        this.postsService.isLoadingSubject.next(false);
        this.toastrService.success('Đăng bài thành công', 'Thông báo');
        window.location.reload();
      },
      error => {
        this.toastrService.error('Đăng bài thất bại vui lòng thử lại !', 'Lỗi !!!');
      }
    );
  }
}
