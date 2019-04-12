import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class ProfileResolver implements Resolve<User> {
    constructor(private userService: UserService, private alertify: AlertifyService
        , private router: Router, private authService: AuthService) {}

    // ActivatedRouteSnapshot automatically subscribs so we just need to add pipe for error handling
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('데이터를 불러오는 데 실패하였습니다.');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
