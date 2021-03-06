import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Instructor } from '../_models/instructor';
import { Client } from '../_models/client';
import { User } from '../_models/user';
import { ClientImage } from '../_models/clientImage';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from './alertify.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl + 'users/';
  allocatedClients: any;
  users: any;

  constructor(private http: HttpClient, private alertify: AlertifyService) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + id);
  }

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.baseUrl + 'instructors');
  }

  getInstructor(id): Observable<Instructor> {
    return this.http.get<Instructor>(this.baseUrl + 'instructors/' + id);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + 'clients');
  }

  getClient(id): Observable<Client> {
    return this.http.get<Client>(this.baseUrl + 'clients/' + id);
  }

  updateClient(id: number, client: Client) {
    return this.http.put(this.baseUrl + 'clients/' + id, client);
  }

  updateInstructor(id: number, instructor: Instructor) {
    return this.http.put(this.baseUrl + 'instructors/' + id, instructor);
  }

  getClientImages(clientId: number): Observable<ClientImage> {
    return this.http.get<ClientImage>(this.baseUrl + 'clients/' + clientId + '/clientimages');
  }

  deletePhoto(clientId: number, photoId: number) {
    return this.http.delete(this.baseUrl + 'clients/' + clientId + '/clientimages/' + photoId);
  }

  deleteUser(userId: number) {
    return this.http.delete(this.baseUrl + userId)
      .pipe(
        catchError(error => {
          this.alertify.error('유저 삭제에 실패하였습니다');
          return of(null);
        })
      );
  }
}
