import { ACCOUNTS_ROUTES } from './adonde-routes';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomainModule } from '../domain';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PassChangeComponent } from './pass-change/pass-change.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { PassResetComponent } from './pass-reset/pass-reset.component';
import { bgAnimationComponent } from './bg-animation/bg-animation.component';
import { FlightsComponent } from './flights/flights.component';
import { RatingComponent } from './rating/rating.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { DeleteComponent } from './delete/delete.component';
import { SavedComponent } from './saved/saved.component';
import { RatingsComponent } from './ratings/ratings.component';
import { WeatherComponent } from './weather/weather.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { ActivitiesComponent } from './activities/activities.component';
import { FooterComponent } from './footer/footer.component';
import { HotelsComponent } from './hotels/hotels.component';
import { RedirectComponent } from './redirect/redirect.component';



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        DomainModule,
        RouterModule.forChild(ACCOUNTS_ROUTES),
        ReactiveFormsModule
    ],
    declarations: [
        LogoutComponent,
        SignupComponent,
        LoginComponent,
        HomeComponent,
        PassChangeComponent,
        PassResetComponent,
        SearchBarComponent,
        SearchResultsComponent,
        LocationDetailsComponent,
        bgAnimationComponent,
        FlightsComponent,
        RatingsComponent,
        RatingComponent,
        NavbarComponent,
        EditAccountComponent,
        DeleteComponent,
        SavedComponent,
        WeatherComponent,
        AboutUsComponent,
        ProfileComponent,
        ActivitiesComponent,
        FooterComponent,
        HotelsComponent,
        RedirectComponent
    ],
    exports: [
        
    ]
})

export class AdondeModule{

}

