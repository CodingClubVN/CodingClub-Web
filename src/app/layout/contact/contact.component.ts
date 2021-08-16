import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../../share/services/contacts/contacts.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  errName = '';
  errEmail = '';
  errMessage = '';
  err = false;
  restForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl('')
  });

  constructor(private contactService: ContactsService) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  onSubmit(a: boolean){
    if (a === true) {
      this.contactService.postContact(this.restForm.value).subscribe(
        res => {
          alert('Bạn đã gửi tin thành công!');
          location.reload();
        }, error => {
          console.log(error);
        }
      );
    }
  }
  checkData(): void{
    if (this.errName === '' && this.errEmail === '' && this.errMessage === ''){
      this.err = true;
    }
  }
  // tslint:disable-next-line:typedef
  checkRegExp(){
    const regexpName = /^([A-Z][a-z]{1,8} ){0,4}[A-Z][a-z]{0,8}$/;
    const regexpEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regexpName.test(this.restForm.value.name) === false){
      this.errName = 'Tên không hợp lệ';
    }else {
      this.errName = '';
    }
    if (regexpEmail.test(this.restForm.value.email) === false){
      this.errEmail = 'Email không hợp lệ';
    }else {
      this.errEmail = '';
    }
    if (!this.restForm.value.message) {
      this.errMessage = 'Bạn chưa nhập tin nhắn';
    }else {
      this.errMessage = '';
    }
  }

}
