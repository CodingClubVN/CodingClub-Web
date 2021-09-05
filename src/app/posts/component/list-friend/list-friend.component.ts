import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../share/services/user/user.service';

@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.scss']
})
export class ListFriendComponent implements OnInit {
  listAllUser: any = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    this.userService.getAllUsers().subscribe(
      res => {
        this.listAllUser = res;
        console.log(this.listAllUser);
      },
      error => {
        console.log(error);
      }
    );
  }
}
