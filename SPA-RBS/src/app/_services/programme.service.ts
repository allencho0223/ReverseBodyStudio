import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { Observable, of } from 'rxjs';
import { Programme } from '../_models/programme';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProgrammeService {

  baseUrl = environment.apiUrl + 'users/clients/';

  constructor(private http: HttpClient, private alertify: AlertifyService) { }

  addProgramme(clientId: number, programme: Programme) {
    return this.http.post(this.baseUrl + clientId + '/programmes', programme)
      .pipe(
        catchError(error => {
          this.alertify.error('프로그램 추가에 실패하였습니다.');
          return of(null);
        })
      );
  }

  deleteProgramme(clientId: number, programmeId: number) {
    return this.http.delete(this.baseUrl + clientId + '/programmes/' + programmeId)
      .pipe(
        catchError(error => {
          this.alertify.error('프로그램 삭제에 실패하였습니다');
          return of(null);
        })
      );
  }

}
