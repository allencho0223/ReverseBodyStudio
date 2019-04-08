import { Component, OnInit } from '@angular/core';
import { ImageService } from '../_services/image.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-before-and-after',
  templateUrl: './before-and-after.component.html',
  styleUrls: ['./before-and-after.component.css']
})
export class BeforeAndAfterComponent implements OnInit {
  bnaImages: any;

  constructor(private imageService: ImageService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getBnaImages();
  }

  getBnaImages() {
    this.imageService.getBnaImages().subscribe(response => {
      this.bnaImages = response;
    }, error => {
      this.alertify.error(error);
    });
  }

}
