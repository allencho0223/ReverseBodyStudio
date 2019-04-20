import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertifyService } from './alertify.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Symptom } from '../_models/symptom';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SymptomService {

  baseUrl = environment.apiUrl + 'users/clients/';

  constructor(private http: HttpClient, private alertify: AlertifyService) { }

  addSymptom(clientId: number, symptom: Symptom) {
    return this.http.post(this.baseUrl + clientId + '/symptoms', symptom)
      .pipe(
        catchError(error => {
          this.alertify.error('증상 추가에 실패하였습니다.');
          return of(null);
        })
      );
  }

  deleteSymptom(clientId: number, symptomId: number) {
    return this.http.delete(this.baseUrl + clientId + '/symptoms/' + symptomId)
      .pipe(
        catchError(error => {
          this.alertify.error('증상 삭제에 실패하였습니다');
          return of(null);
        })
      );
  }

}
