import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ImageService } from 'src/app/_services/image.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {
  modalRef: BsModalRef;
  instructors: any;
  baseUrl = 'http://localhost:5000/api/users/';
  constructor(private modalService: BsModalService, private http: HttpClient
    , private alertify: AlertifyService) { }

  ngOnInit() {
    this.getInstructors();
  }

  getInstructors() {
    return this.http.get(this.baseUrl + 'instructors').subscribe(response => {
      this.instructors = response;
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
