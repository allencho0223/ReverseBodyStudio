import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;

  // The model variable will retrieve the user's id and password as an object
  model: any = {};
  currentUser: any;
  isNavbarCollapsed = true;

  constructor(public authService: AuthService, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('성공적으로 로그인 하셨습니다.');
      this.currentUser = this.model;
      this.loginForm.reset();
    }, error => {
      this.alertify.error('아이디 또는 패스워드를 잘못 입력하셨습니다.');
      this.loginForm.reset();
    }, () => {
      this.router.navigate(['/home']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('로그아웃 하셨습니다.');
    this.router.navigate(['/home']);
  }

}
