import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;

  user: User;
  instructor: any;
  customer: any;
  baseUrl = environment.apiUrl + 'users/';

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(private route: ActivatedRoute, private http: HttpClient
    , private alertify: AlertifyService, private userService: UserService
    , private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadUser();
  }

  loadCustomer() {
    this.http.get(this.baseUrl + 'customers/' + this.user.id).subscribe(response => {
      this.customer = response;
    }, error => {
      this.alertify.error('데이터를 불러오는 데 실패하였습니다.');
    });
  }

  loadUser() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      this.loadCustomer();
    }, error => {
      this.alertify.error('데이터를 불러오는 데 실패하였습니다.');
    });
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.customer).subscribe(next => {
      this.alertify.success('프로필이 업데이트 되었습니다.');
      this.editForm.reset(this.customer);
      this.router.navigate(['']);
    }, error => {
      this.alertify.error('프로필 업데이트에 실패하였습니다.');
    });
  }

}
