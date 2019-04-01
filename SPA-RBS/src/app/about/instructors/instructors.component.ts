import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ImageService } from 'src/app/_services/image.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {
  modalRef: BsModalRef;
  instructors: any;
  constructor(private modalService: BsModalService, private imageService: ImageService
    , private alertify: AlertifyService) { }

  ngOnInit() {
    this.getInstructors();
  }

  getInstructors() {
    this.imageService.getInstructorImages().subscribe(response => {
      this.instructors = response;
    }, error => {
      this.alertify.error(error);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
}
