import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // The model variable will retrieve the user's id and password as an object
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in successfully');
    }, error => {
      console.log('Failed to login');
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');

    // This double exclamation marks returns true or false
    // If something is in the token, it will return true,
    // if not, return false
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged out');
  }

}
