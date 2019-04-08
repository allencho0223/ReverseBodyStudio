import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule, ModalModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { BeforeAndAfterComponent } from './before-and-after/before-and-after.component';
import { FacilitiesComponent } from './about/facilities/facilities.component';
import { InstructorsComponent } from './about/instructors/instructors.component';

import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { ContactComponent } from './contact/contact.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { AuthRegisterComponent } from './auth/auth-register/auth-register.component';

import { ErrorInterceptorProvider } from './_services/error.interceptor';

import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { appRoutes } from './routes';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './_guards/auth.guard';

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
      ScheduleComponent,
      ProgrammesComponent,
      FooterComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      NgbModule.forRoot(),
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      TabsModule.forRoot(),
      ModalModule.forRoot()
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})

export class AppModule { }
