import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule, ModalModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { BeforeAndAfterComponent } from './before-and-after/before-and-after.component';
import { FacilitiesComponent } from './about/facilities/facilities.component';
import { InstructorsComponent } from './about/instructors/instructors.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { ContactComponent } from './contact/contact.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { AuthRegisterComponent } from './auth/auth-register/auth-register.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageInstructorsComponent } from './manage/manage-instructors/manage-instructors.component';
import { ManageCustomersComponent } from './manage/manage-customers/manage-customers.component';
import { StatusComponent } from './status/status.component';


import { ErrorInterceptorProvider } from './_services/error.interceptor';

import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';

import { appRoutes } from './routes';

import { AuthGuard } from './_guards/auth.guard';

import { ProfileResolver } from './_resolvers/profile.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';


export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      BeforeAndAfterComponent,
      FacilitiesComponent,
      InstructorsComponent,
      AuthRegisterComponent,
      AuthLoginComponent,
      ContactComponent,
      ProgrammesComponent,
      FooterComponent,
      ProfileComponent,
      ManageInstructorsComponent,
      ManageCustomersComponent,
      StatusComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      NgbModule.forRoot(),
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      TabsModule.forRoot(),
      ModalModule.forRoot(),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      UserService,
      ProfileResolver,
      PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})

export class AppModule { }
