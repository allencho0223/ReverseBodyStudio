import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  isUserSelected = false;
  isUserSearched = false;
  users: any;
  deletedUser: any;
  userValue: any;
  searchedUser: any;
  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    return this.userService.getUsers().subscribe(users => {
      this.users = users;
    }, error => {
      this.alertify.error('유저 목록을 받을 수 없습니다.');
    });
  }

  searchUser() {
    this.isUserSearched = true;
    this.searchedUser = this.users.filter(x => x.userName === this.userValue)[0];
    if (typeof this.searchedUser === 'undefined') {
      this.alertify.error('존재하지 않는 유저입니다.');
      this.isUserSearched = false;
    } else {
      if (this.searchedUser.userType === 'Instructor') {
        return this.userService.getInstructor(this.searchedUser.id).subscribe(instructor => {
          this.searchedUser = instructor;
        }, error => {
          this.alertify.error('회원 정보를 받아올 수 없습니다.');
        });
      } else if (this.searchedUser.userType === 'Client') {
        return this.userService.getClient(this.searchedUser.id).subscribe(client => {
          this.searchedUser = client;
        }, error => {
          this.alertify.error('회원 정보를 받아올 수 없습니다.');
        });
      }
    }
  }

  removeUser() {
    return this.alertify.confirm('정말로 유저를 삭제하시겠습니까? 삭제된 유저는 복구할 수 없습니다.', () => {
      this.userService.deleteUser(this.searchedUser.id).subscribe(() => {
        this.alertify.success('유저를 성공적으로 삭제하였습니다');
        this.isUserSearched = false;
      }, error => {
        this.alertify.error('유저 삭제를 실패하였습니다.');
      });
    });
  }

}
