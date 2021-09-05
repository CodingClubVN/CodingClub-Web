import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from 'src/app/share/services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private userService: UserService, private router: ActivatedRoute) { }
  searchKeyword: string = '';
  searchResult: any;
  listInvitations: any;
  ngOnInit(): void {
    this.getSearchResult();
  }
  getSearchResult(): void {
    this.listInvitations = this.getFriendInvitation();
    console.log(this.listInvitations);
    this.router.queryParams.subscribe(params => {
      this.searchKeyword = params['q'];
    });
    this.userService.searchUser(this.searchKeyword).subscribe(
      res => {
        this.searchResult = res;
        console.log(this.listInvitations);
        this.searchResult.forEach((user: any) => {
          if(this.listInvitations.find((findUser: any) => findUser.username == user.username) != undefined)
            user.requested = true;
          else
            user.requested = false;
        })
        console.log(this.searchResult);
      },
      error => {
        console.log(error);
      }
    );
  }
  sendFriendRequest(username: string) {
    this.userService.sendFriendRequest(username).subscribe(
      res => {
        console.log(res.message)
      },
      error => {
        console.log(error)
      }
    );
  }
  getFriendInvitation() {
    this.userService.getFriendInvitation(sessionStorage.getItem('username') || 'noUser').subscribe(
      res => {
        this.listInvitations = res;
      },
      error => {
        console.log(error)
      }
    )
  }
  cancelFriendRequest(username: string) {
    this.userService.cancelFriendRequest(username).subscribe(
      res => {
        console.log(res.message)
      },
      error => {
        console.log(error)
      }
    )
  }
}
  