import { Component, OnInit } from '@angular/core';
import {UserService} from '../../share/services/user/user.service';
import {TokenStorageService} from '../../share/services/auth/token-storage.service';
import {FormControl, Validators, FormBuilder} from '@angular/forms';
import {PostsService} from '../../share/services/posts/posts.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  personalInformation: any;
  infoUser: any;
  username: any;
  editProfile = false;
  imgUrl: any;
  checkTagetImg = false;
  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService,
              private formBuilder: FormBuilder,
              private postsService: PostsService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.infoUser = this.formBuilder.group({
      lastname: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      avatar: [null]
    });
    this.getUsername();
    this.getUser(this.username);
  }
  // tslint:disable-next-line:typedef
  get f() {
    return this.infoUser.controls;
  }
  getUsername(): void{
    this.username = this.tokenStorageService.getUsername();
    console.log(this.username);
    console.log(this.tokenStorageService.getUsername());
  }
  getUser(username: any): void{
    this.userService.getUserByUsername(username).subscribe(
      res => {
        this.personalInformation = res;
        console.log(this.personalInformation);
        this.infoUser.get('lastname').setValue(this.personalInformation.lastname);
        this.infoUser.get('firstname').setValue(this.personalInformation.firstname);
        this.infoUser.get('email').setValue(this.personalInformation.email);
        this.infoUser.get('phone').setValue(this.personalInformation.phone);
      },
      error => {
        console.log(error);
      }
    );
  }
  onFileSelected(event: any): void {
    if (event.target.files){
      this.checkTagetImg = true;
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        console.log(this.imgUrl);
      };
      const file = (event.target.files[0] as File);
      this.infoUser.get('avatar').setValue(file);
    }
  }
  onSubmit(): void{
    this.postsService.isLoadingSubject.next(true);
    const fd: any  = new FormData();
    if (this.personalInformation.lastname !== this.infoUser.get('lastname').value){
      fd.append('lastname', this.infoUser.get('lastname').value);
    }
    if (this.personalInformation.firstname !== this.infoUser.get('firstname').value){
      fd.append('firstname', this.infoUser.get('firstname').value);
    }
    if (this.personalInformation.email !== this.infoUser.get('email').value){
      fd.append('email', this.infoUser.get('email').value);
    }
    if (this.personalInformation.phone !== this.infoUser.get('phone').value){
      fd.append('phone', this.infoUser.get('phone').value);
    }
    if (this.infoUser.get('avatar').value !== null){
      fd.append('avatar', this.infoUser.get('avatar').value);
    }
    for (const value of fd.values()){
      console.log(value);
    }
    this.userService.putUserByUsername(this.username, fd).subscribe(
      res => {
        this.postsService.isLoadingSubject.next(false);
        this.toastrService.success('Thay đổi thông tin thành công', 'Thông báo !')
        console.log(res);
        this.reload();
      },
      error => {
        this.postsService.isLoadingSubject.next(false);
        this.toastrService.error('Thay đổi thông tin thất bại vui lòng thử lại', 'Thông báo !')
        console.log(error);
      }
    );
  }
  reload(): void{
    window.location.reload();
  }

}
