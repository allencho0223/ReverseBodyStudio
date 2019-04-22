import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ExperienceService } from 'src/app/_services/experience.service';

@Component({
  selector: 'app-assign-clients',
  templateUrl: './assign-clients.component.html',
  styleUrls: ['./assign-clients.component.css']
})
export class AssignClientsComponent implements OnInit {

  instructors = new Array();
  clients = new Array();
  unAssignedClients = new Array();
  selectedInstructor: any;
  selectedClient: any;
  experiences: any;

  isInstructorSelected = false;
  isClientSelected = false;

  constructor(private userService: UserService, private alertify: AlertifyService
    , private experienceService: ExperienceService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.getInstructors();
    this.getClients();
  }

  getInstructors() {
    return this.userService.getInstructors().subscribe(instructors => {
      this.instructors = instructors;
    }, error => {
      this.alertify.error('선생님 목록을 받아올 수 없습니다');
    });
  }

  getClients() {
    return this.userService.getClients().subscribe(clients => {
      this.clients = clients;
    }, error => {
      this.alertify.error('회원 목록을 받아올 수 없습니다');
    }, () => {
      for (let i = 0; i < this.clients.length; i++) {
        if (this.clients[i].instructorId === null) {
          this.unAssignedClients.push(this.clients[i]);
        }
      }
    });
  }

  selectInstructor(event: any) {
    if (event !== 'None') {
      return this.userService.getInstructor(event).subscribe(instructor => {
        this.selectedInstructor = instructor;
      }, error => {
        this.alertify.error('선생님 정보를 불러올 수 없습니다.');
      }, () => {
        this.isInstructorSelected = true;
        this.experienceService.getExperiences(this.selectedInstructor.id).subscribe(experiences => {
          this.experiences = experiences;
        }, error => {
          this.alertify.error('선생님의 경력을 불러올 수 없습니다.');
        });
      });
    } else {
      this.isInstructorSelected = false;
    }

  }

  selectClient(event: any) {
    this.userService.getClient(event).subscribe(client => {
      this.selectedClient = client;
      this.isClientSelected = true;
    }, error => {
      this.alertify.error('회원 정보를 받아올 수 없습니다.');
    });
  }

  assignClient(instructorId: number) {
    this.selectedClient.instructorId = instructorId;
    return this.userService.updateClient(this.selectedClient.id, this.selectedClient)
      .subscribe(() => {
        this.alertify.success('회원을 성공적으로 배정하였습니다.');
        this.isInstructorSelected = false;
      }, error => {
        this.alertify.error('회원 배정에 실패하였습니다');
      });
  }

  cancelAssign() {
    this.isInstructorSelected = false;
    this.isClientSelected = false;
    this.selectInstructor('None');
  }
}
