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
import { DeleteComponent } from "./delete/delete.component";
import { SavedComponent } from "./saved/saved.component";
import { PassChangeComponent } from "./pass-change/pass-change.component";
import { WeatherComponent } from "./weather/weather.component";
import { FlightsComponent } from './flights/flights.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const ACCOUNTS_ROUTES : Routes = [
    { path: '', component: HomeComponent},
    { path: 'null', component: HomeComponent},
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent},
    { path: 'reset', component: PassResetComponent },
    { path: 'home', component: HomeComponent},
    { path: 'searchResults', component: SearchResultsComponent},
    { path: 'locations/:location_id', component: LocationDetailsComponent},
    { path: 'location/:location_id/:flights', component: FlightsComponent, data : {location_id : ':location_id'}},
    { path: 'edit', component: EditAccountComponent},
    { path: 'delete', component: DeleteComponent},
    { path: 'saved', component: SavedComponent },
    { path: 'change', component: PassChangeComponent},
    { path: 'weather/:location_id', component: WeatherComponent},
    { path: 'aboutus', component: AboutUsComponent }
    
];