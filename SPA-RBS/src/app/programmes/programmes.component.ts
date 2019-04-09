import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.css']
})
export class ProgrammesComponent implements OnInit {
  baseUrl = 'http://localhost:5000/api/programmes/';
  rehabs: any;
  fmws: any;

  constructor(private http: HttpClient, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getRehabProgrammes();
    this.getFmwProgrammes();
  }

  getRehabProgrammes() {
    return this.http.get(this.baseUrl + 'rehab').subscribe(response => {
      this.rehabs = response;
      console.log(this.rehabs);
    }, error => {
      this.alertify.error(error);
    });
  }

  getFmwProgrammes() {
    return this.http.get(this.baseUrl + 'fmw').subscribe(response => {
      this.fmws = response;
    }, error => {
      this.alertify.error(error);
    });
  }

}
