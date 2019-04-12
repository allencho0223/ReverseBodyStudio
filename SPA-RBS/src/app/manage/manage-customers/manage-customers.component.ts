import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})
export class ManageCustomersComponent implements OnInit {

  user: User;
  baseUrl = environment.apiUrl + 'users/instructors/';
  instructor: any;
  constructor(private route: ActivatedRoute, private alertify: AlertifyService
    , private http: HttpClient) { }

  ngOnInit() {
    this.getInstructor();
  }

  getInstructor() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      this.getCustomers(this.user.id);
    }, error => {
      this.alertify.error('데이터를 불러오는 데 실패하였습니다.');
    });
  }
  getCustomers(id) {
    return this.http.get(this.baseUrl + id).subscribe(response => {
      this.instructor = response;
      console.log(this.instructor);
    }, error => {
      this.alertify.error('존재하지 않는 사용자입니다.');
    });
  }

}
