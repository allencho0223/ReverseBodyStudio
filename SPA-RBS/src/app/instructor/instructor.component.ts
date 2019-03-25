import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {
  instructors: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getInstructors();
  }

  getInstructors() {
    /*
      this.http.get returns an observable
      Observable can be considered as stream of data from the server
      In order to get the observable data, we need to subscribe to it
      subscribe function's first parameter takes a callback function to tell us what we wanna do when these results come back
      Second parameter is for the error handling which also takes a function
      Third is what to do when the subscription is complete
    */
    this.http.get('http://localhost:5000/api/instructors').subscribe(response => {
      this.instructors = response;
    }, error => {
      console.log(error);
    });
  }
}
