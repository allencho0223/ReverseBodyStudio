import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ExperienceService } from '../_services/experience.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;

  user: User;
  instructor: any;
  client: any;
  experiences: any;
  experience: any = {};
  baseUrl = environment.apiUrl + 'users/';
  addExpForm: FormGroup;

  calledAddExpForm = false;
  calledDeleteExpList = false;

  expId: any;
  bsConfig: Partial<BsDatepickerConfig>;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private http: HttpClient
    , private alertify: AlertifyService, private userService: UserService
    , private authService: AuthService, private router: Router
    , private experienceService: ExperienceService, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue'
    };
    this.loadUser();
  }

  loadUser() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      if (this.user.userType === 'Client') {
        this.loadClient(this.user.id);
      } else if (this.user.userType === 'Instructor') {
        this.loadInstructor(this.user.id);
      }
    }, error => {
      this.alertify.error('데이터를 불러오는 데 실패하였습니다.');
    });
  }

  loadInstructor(instructorId: number) {
    this.userService.getInstructor(instructorId).subscribe(instructor => {
      this.instructor = instructor;
      this.getInstructorExperiences(this.instructor.id);
    }, error => {
      this.alertify.error('데이터를 불러오는 데 실패하였습니다.');
    });
  }

  getInstructorExperiences(instructorId: number) {
    return this.experienceService.getExperiences(instructorId).subscribe(exps => {
      this.experiences = exps;
    }, error => {
      this.alertify.error('강사 경력을 받아올 수 없습니다.');
    });
  }

  loadClient(clientId: number) {
    this.http.get(this.baseUrl + 'clients/' + clientId).subscribe(response => {
      this.client = response;
    }, error => {
      this.alertify.error('데이터를 불러오는 데 실패하였습니다.');
    });
  }

  updateUser() {
    if (this.user.userType === 'Client') {
      this.userService.updateClient(this.authService.decodedToken.nameid, this.client).subscribe(next => {
        this.alertify.success('프로필이 업데이트 되었습니다.');
        this.editForm.reset(this.client);
        this.router.navigate(['']);
      }, error => {
        this.alertify.error('프로필 업데이트에 실패하였습니다.');
      });
    } else if (this.user.userType === 'Instructor') {
      this.userService.updateInstructor(this.authService.decodedToken.nameid, this.instructor).subscribe(next => {
        this.alertify.success('프로필이 업데이트 되었습니다.');
        this.editForm.reset(this.instructor);
        window.location.reload();
      }, error => {
        this.alertify.error('프로필 업데이트에 실패하였습니다.');
      });
    }
  }

  callAddExpForm() {
    this.calledAddExpForm = true;
    this.calledDeleteExpList = false;
    this.createAddExpForm();
  }

  callDeleteExpForm() {
    this.calledDeleteExpList = true;
    this.calledAddExpForm = false;
  }

  selectExp(event: any) {
    this.expId = event;
  }

  addExperience() {
    this.experience = this.addExpForm.value;
    return this.http.get(this.baseUrl + 'instructors/' + this.instructor.id + '/experiences')
      .subscribe(() => {
      }, error => {
        this.alertify.error('경력을 받아올 수 없습니다.');
      }, () => {
        this.experienceService.addExperience(this.instructor.id, this.experience)
          .subscribe(newExp => this.experiences.push(newExp));
        window.location.reload();
        this.alertify.success('경력을 성공적으로 등록하셨습니다.');
      });
  }

  deleteExperience() {
    return this.alertify.confirm('정말로 경력을 삭제하시겠습니까?', () => {
      this.experienceService.deleteExperience(this.instructor.id, this.expId).subscribe(() => {
        window.location.reload();
        this.alertify.success('경력을 성공적으로 삭제하였습니다.');
      }, error => {
        this.alertify.error('경력을 삭제할 수 없습니다.');
      });
    });
  }

  createAddExpForm() {
    this.addExpForm = this.fb.group({
      description: ['', Validators.required],
      instructorId: [this.instructor.id, Validators.required]
    });
  }

}
