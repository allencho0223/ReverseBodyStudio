import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService
    , private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('성공적으로 로그인 하셨습니다.');
    }, error => {
      this.alertify.error('아이디 또는 패스워드를 잘못 입력하셨습니다.');
    }, () => {
      this.router.navigate(['/home']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('성공적으로 로그아웃 하였습니다.');
    this.router.navigate(['/home']);
  }

  cancel() {
    this.authService.cancel();
  }

}
