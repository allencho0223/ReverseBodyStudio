import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HomeDefinitionComponent } from './home/home-definition/home-definition.component';


@NgModule({
   declarations: [
      AppComponent,
      UserComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      HomeDefinitionComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [
      AuthService
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      HomeComponent
   ]
})

export class AppModule {
   constructor(private injector: Injector) {
      const slider = createCustomElement(HomeComponent, { injector });
      customElements.define('motley-slider', slider);
   }

   ngDoBootstrap() { }

}
