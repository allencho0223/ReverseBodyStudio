import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { Experience } from '../_models/experience';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  baseUrl = environment.apiUrl + 'users/instructors/';
  constructor(private http: HttpClient, private alertify: AlertifyService) {}

  addExperience(instructorId: number, experience: Experience) {
    return this.http
      .post(this.baseUrl + instructorId + '/experiences', experience)
      .pipe(
        catchError(error => {
          this.alertify.error('경력 추가에 실패하였습니다.');
          return of(null);
        })
      );
  }

  deleteExperience(instructorId: number, experienceId: number) {
    return this.http
      .delete(this.baseUrl + instructorId + '/experiences/' + experienceId)
      .pipe(
        catchError(error => {
          this.alertify.error('경력 삭제에 실패하였습니다');
          return of(null);
        })
      );
  }
}
