import { Component, OnInit, TemplateRef } from '@angular/core';
import { ImageService } from 'src/app/_services/image.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {
  facilities: any;
  modalRef: BsModalRef;

  constructor(private imageService: ImageService, private alertify: AlertifyService
    , private http: HttpClient, private modalService: BsModalService) { }

  ngOnInit() {
    this.getFacilityImages();
  }

  getFacilityImages() {
    return this.imageService.getFacilityImages().subscribe(response => {
      this.facilities = response;
    }, error => {
      this.alertify.error(error);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
}
