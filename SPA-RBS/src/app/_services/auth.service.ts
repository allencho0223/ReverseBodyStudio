import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    /**
     * 1st param: url
     * 2nd param: body
     * 3rd param: options including header
     */
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
          }
        })
      );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // If the token is invalid (incorrect, expired, etc..)
    // It will return true, hence we should add ! mark in front
    return !this.jwtHelper.isTokenExpired(token);
  }

  cancel() {
    this.router.navigate(['/home']);
  }

}
