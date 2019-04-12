import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instructor } from '../_models/instructor';
import { Customer } from '../_models/customer';
import { User } from '../_models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl + 'users/';
  allocatedCustomers: any;
  users: any;

  constructor(private http: HttpClient) {}

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

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + 'customers');
  }

  getCustomer(id): Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl + 'customers/' + id);
  }

  updateUser(id: number, user: Customer) {
    return this.http.put(this.baseUrl + 'customers/' + id, user);
  }
}
