import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  baseUrl = 'http://localhost:5000/api/images/';

  constructor(private http: HttpClient) { }

  getImages() {
    return this.http.get(this.baseUrl);
  }

  // getInstructorImages() {
  //   return this.http.get(this.baseUrl + 'instructors');
  // }

  getFacilityImages() {
    return this.http.get(this.baseUrl + 'facilities');
  }

}




