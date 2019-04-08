import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FacilitiesComponent } from './about/facilities/facilities.component';
import { InstructorsComponent } from './about/instructors/instructors.component';
import { BeforeAndAfterComponent } from './before-and-after/before-and-after.component';
import { AuthRegisterComponent } from './auth/auth-register/auth-register.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ContactComponent } from './contact/contact.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    // Each route is an object
    { path: '', component: HomeComponent },
    // Dummy route protecting child routes
    {
        path: '', // If path has specific string, it will be added in front of child routes
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'facilities', component: FacilitiesComponent },
            { path: 'instructors', component: InstructorsComponent },
            { path: 'bna', component: BeforeAndAfterComponent },
            { path: 'programmes', component: ProgrammesComponent },
            { path: 'contact', component: ContactComponent },
        ]
    },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'register', component: AuthRegisterComponent },
    { path: 'login', component: AuthLoginComponent },

    // **: wildcard
    // What this does is that if path doesn't fully match, it will redirect to home
    // The ordering is important. If the wildcard route is on top of routes,
    // it will check every single route and we can't get to any route appropriate.
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
