import { ACCOUNTS_ROUTES } from './adonde-routes';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomainModule } from '../domain';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PassChangeComponent } from './pass-change/pass-change.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchResultsComponent } from './search-results/search-results.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        DomainModule,
        RouterModule.forChild(ACCOUNTS_ROUTES)
    ],
    declarations: [
        LogoutComponent,
        SignupComponent,
        LoginComponent,
        HomeComponent,
        PassChangeComponent,
        SearchBarComponent,
        ProfileComponent,
        SearchResultsComponent
    ],
    exports: [
        
    ]
})

export class AdondeModule{

}