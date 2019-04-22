import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { UserService } from 'src/app/_services/user.service';

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

  users: any;
  clients: any;
  isUserNameUnique = false;
  isEmailUnique = false;
  isHeightValid = false;
  isWeightValid = false;

  constructor(private authService: AuthService, private alertify: AlertifyService
    , private fb: FormBuilder, private localeService: BsLocaleService
    , private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue'
    };
    this.getUsers();
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
    this.registerForm = this.fb.group(
      {
        userType: ['Client'],
        userName: ['', Validators.required],
        name: ['', Validators.required],
        phone: ['',
          [
            Validators.required,
            Validators.pattern('^[0-9]{2,3}[-]?([0-9]{3,4})[-]?[0-9]{4}$')
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        gender: ['남'],
        height: ['', Validators.required],
        weight: ['', Validators.required],
        purpose: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*|<>?]).{8,16}$')
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  createInstructorForm() {
    this.registerForm = this.fb.group(
      {
        userType: ['Instructor'],
        userName: ['rbs_', Validators.required],
        name: ['', Validators.required],
        password: [
          '',
          Validators.required,
          [
            Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*|<>?]).{8,16}$')
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true };
  }

  getUsers() {
    return this.userService.getUsers().subscribe(users => {
      this.users = users;
    }, error => {
      this.alertify.error('유저 목록을 받을 수 없습니다.');
    }, () => {
      this.getClients();
    });
  }

  getClients() {
    return this.userService.getClients().subscribe(clients => {
      this.clients = clients;
    }, error => {
      this.alertify.error('회원 목록을 받아올 수 없습니다.');
    });
  }

  checkRegisterValidation() {

    if (this.userType === 'Client') {
      if (typeof (this.clients.filter(x => x.email === this.registerForm.value.email)[0])
        !== 'undefined') {
        this.isEmailUnique = false;
        this.alertify.error('이미 존재하는 이메일입니다.');
      } else {
        this.isEmailUnique = true;
      }
    }

    if (typeof (this.users.filter(x => x.userName === this.registerForm.value.userName)[0])
      !== 'undefined') {
      this.isUserNameUnique = false;
      this.alertify.error('이미 존재하는 아이디입니다.');
    } else {
      this.isUserNameUnique = true;
    }

    this.isHeightValid = false;
    this.isWeightValid = false;

    if (isNaN(this.registerForm.value.height)) {
      this.alertify.error('키는 숫자 형식만 입력 가능합니다.');
    } else if (+this.registerForm.value.height > 250
        || +this.registerForm.value.height < 0) {
      this.alertify.error('키는 0 부터 250까지 설정 가능합니다.');
    } else {
      this.isHeightValid = true;
    }

    if (isNaN(this.registerForm.value.weight)) {
      this.alertify.error('몸무게는 숫자 형식만 입력 가능합니다.');
    } else if (+this.registerForm.value.weight > 250
        || +this.registerForm.value.weight < 0) {
      this.alertify.error('몸무게는 0 부터 250까지 설정 가능합니다.');
    } else {
      this.isWeightValid = true;
    }
  }

  register() {

    this.checkRegisterValidation();

    if (this.isHeightValid && this.isWeightValid && this.isUserNameUnique) {
      return this.authService.register(this.registerForm.value).subscribe(() => {
        this.alertify.success('계정이 성공적으로 등록되었습니다.');
      }, error => {
        this.alertify.error('데이터를 정확하게 입력하여 주세요.');
      }, () => {
        this.router.navigate(['/home']);
      });
    }
  }

  cancel() {
    this.authService.cancel();
  }
}
