import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';


@Injectable({
  providedIn: 'root'
})

// CanActivate is gonna tell our route whether or not it's allowed or can activate the routes that's trying to be accessed.
// And it returns an observable of a boolean (a promise of a boolean) or just a simple boolean
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private alertify: AlertifyService
    , private router: Router) {}

  // canActivate method has a few return types
  // If it has more than one return type with several pipes (|), it's called union
  // Meaning we can return any of the return type
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('이 페이지는 접속하실 수 없습니다.');
    this.router.navigate(['/home']);
    return false;
  }
}
