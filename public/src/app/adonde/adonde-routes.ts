import { Routes } from "@angular/router";
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const ACCOUNTS_ROUTES : Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent}
    
];