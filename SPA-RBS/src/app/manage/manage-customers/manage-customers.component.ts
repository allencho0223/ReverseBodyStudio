import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProgrammeService } from 'src/app/_services/programme.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})

export class ManageCustomersComponent implements OnInit {

  @ViewChild('addProgrammeForm') addProgrammeForm: NgForm;
  @ViewChild('finishProgrammeForm') finishProgrammeForm: NgForm;

  notChosen = true;
  programmeNotChosen = true;
  addProgrammeClicked = false;
  finishProgrammeClicked = false;
  finishFormLoad = false;

  user: User;

  baseUrl = environment.apiUrl + 'users/';

  instructor: any;

  customer: any;
  customers: any;

  programmes: any;
  programme: any = {};
  programmeList: any;
  assignedProgrammes: any = {};

  constructor(private route: ActivatedRoute, private alertify: AlertifyService
    , private http: HttpClient, private programmeService: ProgrammeService) { }

  ngOnInit() {
    this.getInstructor();
  }

  getInstructor() {
    return this.route.data.subscribe(data => {
      this.user = data['user'];
      this.getCustomers(this.user.id);
    }, error => {
      this.alertify.error('데이터를 불러오는 데 실패하였습니다.');
    });
  }

  getCustomers(id) {
    return this.http.get(this.baseUrl + 'instructors/' + id).subscribe(response => {
      this.instructor = response;
    }, error => {
      this.alertify.error('존재하지 않는 사용자입니다.');
    });
  }

  selectCustomer(event: any) {
    this.addProgrammeClicked = false;
    this.finishProgrammeClicked = false;
    if (event === 'false') {
      this.notChosen = !this.notChosen;
    } else {
      this.notChosen = false;
      const customerName = event;
      return this.http.get(this.baseUrl + 'customers').subscribe(response => {
        this.customers = response;
      }, error => {
        this.alertify.error('회원 목록을 받아올 수 없습니다.');
      }, () => {
        for (const value of this.customers) {
          if (value.name === customerName) {
            this.customer = value;
          }
        }
      });
    }
  }

  callAddProgrammeForm() {
    this.addProgrammeClicked = true;
    this.finishProgrammeClicked = false;
    this.finishProgrammeForm.reset();
  }

  callFinishProgrammeForm() {
    this.finishProgrammeClicked = true;
    this.addProgrammeClicked = false;
    this.addProgrammeForm.reset();
  }

  addProgramme() {
    this.finishProgrammeClicked = false;
    return this.http.get(this.baseUrl + 'customers/' + this.customer.id + '/programmes')
      .subscribe(response => {
        this.programmes = response;
      }, error => {
        this.alertify.error('프로그램 목록을 받아올 수 없습니다.');
      }, () => {
        console.log(this.programme);
        this.programmeService.addProgramme(this.customer.id, this.programme)
          .subscribe(newProgramme => this.programmes.push(newProgramme));
        this.alertify.success('프로그램을 성공적으로 등록하셨습니다.');
        this.addProgrammeForm.reset();
        this.cancelProgramme();
      });
  }

  listProgrammes() {
    this.finishProgrammeClicked = true;
    this.addProgrammeClicked = false;
    this.finishFormLoad = false;
    return this.http.get(this.baseUrl + 'customers/' + this.customer.id + '/programmes')
      .subscribe(response => {
        this.programmes = response;
      }, error => {
        this.alertify.error('프로그램 목록을 받아올 수 없습니다.');
      }, () => {
        this.assignedProgrammes = new Array();
        for (const value of this.programmes) {
          this.assignedProgrammes.push(value);
        }
      });
  }

  selectProgramme(event: any) {
    if (event === 'true') {
      this.finishFormLoad = false;
      this.finishProgrammeForm.reset();
    } else {
      this.finishProgrammeClicked = true;
      const programmeName = event;
      return this.http.get(this.baseUrl + 'customers/' + this.customer.id + '/programmes')
        .subscribe(response => {
          this.programmes = response;
        }, error => {
          this.alertify.error('회원 목록을 받아올 수 없습니다.');
        }, () => {
          for (const value of this.programmes) {
            if (value.programmeName === programmeName) {
              this.programme = value;
            }
          }
          this.finishFormLoad = true;
        });
    }
  }

  finishProgramme() {
    return this.programmeService.finishProgramme(this.customer.id, this.programme.id)
      .subscribe(() => {
        this.alertify.success('프로그램 삭제에 성공했습니다.');
        this.cancelProgramme();
        this.finishProgrammeForm.reset();
        this.addProgrammeForm.reset();
      }, error => {
        this.alertify.error('프로그램 삭제에 실패하였습니다');
      });
  }

  cancelProgramme() {
    this.addProgrammeClicked = false;
    this.finishProgrammeClicked = false;
    this.finishFormLoad = false;
  }
}
