import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // In order to receive properties into child component, we need to use @Input
  // After declaring the @Input, we have access to the property
  // @Input() usersFromHome: any;

  // Emit a value which that's going to affect from child component
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('Registration successful');
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    // Emit something from this emit method and then specify what we want to emit
    // When we hit the cancel button inside register component, it's calling this cancel method
    // Which is going to emit the value of false
    // And it's being passed to register child component in parent.component.html using the event (cancelRegister)
    // And it's calling the event (cancelRegisterMode) inside child component (register component)
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }
}
