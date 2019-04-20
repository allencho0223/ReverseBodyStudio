import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FacilitiesComponent } from './about/facilities/facilities.component';
import { InstructorsComponent } from './about/instructors/instructors.component';
import { BeforeAndAfterComponent } from './before-and-after/before-and-after.component';
import { AuthRegisterComponent } from './auth/auth-register/auth-register.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { ContactComponent } from './contact/contact.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileResolver } from './_resolvers/profile.resolver';
import { ManageClientsComponent } from './manage/manage-clients/manage-clients.component';
import { StatusComponent } from './status/status.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ManageUsersComponent } from './manage/manage-users/manage-users.component';

export const appRoutes: Routes = [
    // Each route is an object
    { path: '', component: HomeComponent },
    { path: 'facilities', component: FacilitiesComponent },
    { path: 'instructors', component: InstructorsComponent },
    { path: 'bna', component: BeforeAndAfterComponent },
    { path: 'programmes', component: ProgrammesComponent },
    { path: 'contact', component: ContactComponent },
    // /:id specifies route parameter
    { path: 'profile', component: ProfileComponent, resolve: { user: ProfileResolver}, canDeactivate: [PreventUnsavedChanges] },
    { path: 'manage-users', component: ManageUsersComponent, resolve: { user: ProfileResolver} },
    { path: 'manage-clients', component: ManageClientsComponent, resolve: { user: ProfileResolver} },
    { path: 'status', component: StatusComponent, resolve: { user: ProfileResolver} },
    { path: 'register', component: AuthRegisterComponent },
    { path: 'login', component: AuthLoginComponent },

    // **: wildcard
    // What this does is that if path doesn't fully match, it will redirect to home
    // The ordering is important. If the wildcard route is on top of routes,
    // it will check every single route and we can't get to any route appropriate.
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
