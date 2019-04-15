import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { Observable, of } from 'rxjs';
import { Programme } from '../_models/programme';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})

export class ProgrammeService {

  baseUrl = environment.apiUrl + 'users/customers/';

  constructor(private http: HttpClient, private alertify: AlertifyService) { }

  addProgramme(customerId: number, programme: Programme) {
    return this.http.post(this.baseUrl + customerId + '/programmes', programme, httpOptions)
      .pipe(
        catchError(error => {
          this.alertify.error('프로그램 추가에 실패하였습니다.');
          return of(null);
        })
      );
  }

  finishProgramme(customerId: number, programmeId: number) {
    return this.http.delete(this.baseUrl + customerId + '/programmes/' + programmeId, httpOptions)
      .pipe(
        catchError(error => {
          this.alertify.error('프로그램 삭제에 실패하였습니다');
          return of(null);
        })
      );
  }

}
