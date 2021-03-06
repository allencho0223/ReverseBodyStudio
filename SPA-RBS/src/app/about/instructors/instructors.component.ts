import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { Instructor } from 'src/app/_models/instructor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {
  modalRef: BsModalRef;
  instructors: any;
  baseUrl = environment.apiUrl + 'users/';
  constructor(private modalService: BsModalService, private instructorService: UserService
    , private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadInstructors();
  }

  loadInstructors() {
    return this.instructorService.getInstructors().subscribe((instructors: Instructor[]) => {
      this.instructors = instructors;
    }, error => {
      this.alertify.error(error);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
  }
}
