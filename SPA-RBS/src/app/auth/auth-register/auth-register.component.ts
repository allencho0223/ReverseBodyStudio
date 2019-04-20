import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent implements OnInit {
  model: any = {};
  userType: any;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alertify: AlertifyService
    , private fb: FormBuilder, private localeService: BsLocaleService
    , private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue'
    };
  }

  selectUserType(event: any) {
    this.userType = event;
    if (this.userType === 'Client') {
      this.createClientForm();
    } else if (this.userType === 'Instructor') {
      this.createInstructorForm();
    }
  }

  createClientForm() {
    this.registerForm = this.fb.group({
      userType: ['Client'],
      userName: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      gender: ['male'],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      purpose: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  createInstructorForm() {
    this.registerForm = this.fb.group({
      userType: ['Instructor'],
      userName: ['rbs_', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(() => {
      this.alertify.success('계정이 성공적으로 등록되었습니다.');
    }, error => {
      this.alertify.error('데이터를 정확하게 입력하여 주세요.');
    }, () => {
      this.router.navigate(['/home']);
    });
  }

  cancel() {
    this.authService.cancel();
  }

}
