import { Routes } from "@angular/router";
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SearchResultsComponent } from "./search-results/search-results.component";
import { LocationDetailsComponent } from "./location-details/location-details.component";
import { bgAnimationComponent } from "./bg-animation/bg-animation.component";
import { PassResetComponent } from "./pass-reset/pass-reset.component";
import { EditAccountComponent } from "./edit-account/edit-account.component";

export const ACCOUNTS_ROUTES : Routes = [
    { path: '', component: HomeComponent},
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent},
    { path: 'reset', component: PassResetComponent },
    { path: 'home', component: HomeComponent},
    { path: 'searchResults', component: SearchResultsComponent},
    { path: 'location/:location_id', component: LocationDetailsComponent},
    { path: 'edit', component: EditAccountComponent}
    
];