import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProgrammeService } from 'src/app/_services/programme.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { SymptomService } from 'src/app/_services/symptom.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.css']
})

export class ManageClientsComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;
  @ViewChild('addProgrammeForm') addProgrammeForm: NgForm;
  @ViewChild('addSymptomForm') addSymptomForm: NgForm;
  @ViewChild('deleteSymptomForm') deleteSymptomForm: NgForm;
  @ViewChild('deleteProgrammeForm') deleteProgrammeForm: NgForm;

  clientNotChosen = true;
  addProgrammeClicked = false;
  deleteProgrammeClicked = false;
  deleteSymptomClicked = false;
  deleteProgrammeFormLoad = false;
  deleteSymptomFormLoad = false;
  addSymptomClicked = false;

  user: User;

  baseUrl = environment.apiUrl + 'users/';

  instructor: any;

  client: any;
  clients = new Array();

  programmes: any;
  programme: any = {};
  programmeList: any;
  assignedProgrammes = new Array();
  symptoms: any;
  symptom: any = {};
  symptomList: any;
  assignedSymptoms = new Array();

  clientImages: any;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService
    , private http: HttpClient, private programmeService: ProgrammeService
    , private userService: UserService, private symptomService: SymptomService) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue'
    };
    this.getUser();
  }


  // Select a client
  getUser() {
    return this.route.data.subscribe(data => {
      this.user = data['user'];
      this.getInstructor(this.user.id);
    }, error => {
      this.alertify.error('데이터를 불러오는 데 실패하였습니다.');
    });
  }

  getInstructor(instructorId: number) {
    return this.userService.getInstructor(instructorId).subscribe(instructor => {
      this.instructor = instructor;
    }, error => {
      this.alertify.error('강사를 불러올 수 없습니다.');
    }, () => {
      this.getClients(this.instructor.id);
    });
  }

  getClients(instructorId: number) {
    return this.userService.getClients().subscribe(clients => {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].instructorId === this.instructor.id) {
          this.clients.push(clients[i]);
        }
      }
    }, error => {
      this.alertify.error('회원 목록을 받아올 수 없습니다.');
    });
  }

  selectClient(event: any) {
    this.addProgrammeClicked = false;
    this.deleteProgrammeClicked = false;
    if (event === 'false') {
      this.clientNotChosen = !this.clientNotChosen;
    } else {
      this.clientNotChosen = false;
      const clientName = event;
      for (const value of this.clients) {
        if (value.name === clientName) {
          this.client = value;
        }
      }
    }
  }


  // Add a programme
  addProgramme() {
    this.addProgrammeClicked = true;
    this.deleteProgrammeClicked = false;
    this.addSymptomClicked = false;
    this.deleteSymptomClicked = false;
  }

  addSymptom() {
    this.addSymptomClicked = true;
    this.addProgrammeClicked = false;
    this.deleteProgrammeClicked = false;
    this.deleteSymptomClicked = false;
  }

  submitSymptom() {
    this.deleteSymptomClicked = false;
    return this.http.get(this.baseUrl + 'clients/' + this.client.id + '/symptoms')
      .subscribe(response => {
        this.symptoms = response;
      }, error => {
        this.alertify.error('증상 목록을 받아올 수 없습니다.');
      }, () => {
        this.symptomService.addSymptom(this.client.id, this.symptom)
          .subscribe(newSymptom => this.symptoms.push(newSymptom));
        this.alertify.success('증상을 성공적으로 등록하셨습니다.');
        this.addSymptomForm.reset(this.symptom);
        this.cancelButton();
      });
  }

  submitProgramme() {
    this.deleteProgrammeClicked = false;
    return this.http.get(this.baseUrl + 'clients/' + this.client.id + '/programmes')
      .subscribe(response => {
        this.programmes = response;
      }, error => {
        this.alertify.error('프로그램 목록을 받아올 수 없습니다.');
      }, () => {
        this.programmeService.addProgramme(this.client.id, this.programme)
          .subscribe(newProgramme => this.programmes.push(newProgramme));
        this.alertify.success('프로그램을 성공적으로 등록하셨습니다.');
        // this.addProgrammeForm.reset(this.programme);
        this.cancelButton();
      });
  }

  // Delete a symptom
  listSymptoms() {
    this.deleteSymptomClicked = true;
    this.addSymptomClicked = false;
    this.deleteSymptomFormLoad = false;
    this.addProgrammeClicked = false;
    this.deleteProgrammeClicked = false;
    return this.http.get(this.baseUrl + 'clients/' + this.client.id + '/symptoms')
      .subscribe(response => {
        this.symptoms = response;
      }, error => {
        this.alertify.error('증상 목록을 받아올 수 없습니다.');
      }, () => {
        this.assignedSymptoms = new Array();
        for (const value of this.symptoms) {
          this.assignedSymptoms.push(value);
        }
      });
  }

  selectSymptom(event: any) {
    if (event === 'true') {
      this.deleteSymptomFormLoad = false;
    } else {
      this.deleteSymptomClicked = true;
      const symptomName = event;
      return this.http.get(this.baseUrl + 'clients/' + this.client.id + '/symptoms')
        .subscribe(response => {
          this.symptoms = response;
        }, error => {
          this.alertify.error('회원 목록을 받아올 수 없습니다.');
        }, () => {
          for (const value of this.symptoms) {
            if (value.symptomName === symptomName) {
              this.symptom = value;
            }
          }
          this.deleteSymptomFormLoad = true;
        });
    }
  }

  callDeleteSymptomForm() {
    this.deleteSymptomClicked = true;
    this.addSymptomClicked = false;
    // this.addSymptomForm.reset(this.symptom);
  }

  deleteSymptom() {
    return this.alertify.confirm('정말로 증상을 삭제하시겠습니까?', () => {
      this.symptomService.deleteSymptom(this.client.id, this.symptom.id)
      .subscribe(() => {
        this.alertify.success('증상 삭제에 성공했습니다.');
        this.cancelButton();
        this.deleteSymptomForm.resetForm(this.symptom);
      }, error => {
        this.alertify.error('증상 삭제에 실패하였습니다');
      });
    });
  }

  // Delete a programme
  listProgrammes() {
    this.deleteProgrammeClicked = true;
    this.addProgrammeClicked = false;
    this.deleteProgrammeFormLoad = false;
    this.deleteSymptomClicked = false;
    this.addSymptomClicked = false;
    return this.http.get(this.baseUrl + 'clients/' + this.client.id + '/programmes')
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
      this.deleteProgrammeFormLoad = false;
    } else {
      this.deleteProgrammeClicked = true;
      const programmeName = event;
      return this.http.get(this.baseUrl + 'clients/' + this.client.id + '/programmes')
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
          this.deleteProgrammeFormLoad = true;
        });
    }
  }

  callDeleteProgrammeForm() {
    this.deleteProgrammeClicked = true;
    this.addProgrammeClicked = false;
    // this.addProgrammeForm.reset(this.programme);
  }

  deleteProgramme() {
    return this.alertify.confirm('정말로 프로그램을 삭제하시겠습니까?', () => {
      this.programmeService.deleteProgramme(this.client.id, this.programme.id)
      .subscribe(() => {
        this.alertify.success('프로그램 삭제에 성공했습니다.');
        this.cancelButton();
        this.deleteProgrammeForm.reset(this.programme);
      }, error => {
        this.alertify.error('프로그램 삭제에 실패하였습니다');
      });
    });
  }

  cancelButton() {
    this.addProgrammeClicked = false;
    this.deleteProgrammeClicked = false;
    this.deleteProgrammeFormLoad = false;
    this.addSymptomClicked = false;
    this.deleteSymptomClicked = false;
    this.deleteSymptomFormLoad = false;
  }

}
