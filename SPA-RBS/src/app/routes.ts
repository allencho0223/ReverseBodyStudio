import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FacilitiesComponent } from './about/facilities/facilities.component';
import { InstructorsComponent } from './about/instructors/instructors.component';
import { ReversebodyComponent } from './about/reversebody/reversebody.component';
import { BeforeAndAfterComponent } from './before-and-after/before-and-after.component';
import { FaqComponent } from './faq/faq.component';
import { ProgrammeDietComponent } from './programmes/programme-diet/programme-diet.component';
import { ProgrammePilatesComponent } from './programmes/programme-pilates/programme-pilates.component';
import { ProgrammeRehabComponent } from './programmes/programme-rehab/programme-rehab.component';
import { ProgrammeStrengthComponent } from './programmes/programme-strength/programme-strength.component';
import { AuthRegisterComponent } from './auth/auth-register/auth-register.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ContactComponent } from './contact/contact.component';

export const appRoutes: Routes = [
    // Each route is an object
    { path: 'home', component: HomeComponent },
    { path: 'facilities', component: FacilitiesComponent },
    { path: 'instructors', component: InstructorsComponent },
    { path: 'reversebody', component: ReversebodyComponent },
    { path: 'beforeandafter', component: BeforeAndAfterComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'diet', component: ProgrammeDietComponent },
    { path: 'pilates', component: ProgrammePilatesComponent },
    { path: 'rehab', component: ProgrammeRehabComponent },
    { path: 'strength', component: ProgrammeStrengthComponent },
    { path: 'register', component: AuthRegisterComponent },
    { path: 'login', component: AuthLoginComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'contact', component: ContactComponent },

    // **: wildcard
    // What this does is that if path doesn't fully match, it will redirect to home
    // The ordering is important. If the wildcard route is on top of routes,
    // it will check every single route and we can't get to any route appropriate.
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
