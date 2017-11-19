import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdondeModule } from './adonde/adonde.module'
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LocationRepository, newQueryService } from './domain/index';
import { FormsModule } from '@angular/forms';

const defaultRoute = '/home';

@NgModule({
    imports: [ 
        BrowserModule,
        AdondeModule,
        RouterModule.forRoot([
            { path: '', redirectTo: defaultRoute, pathMatch: 'full' }
        ]),
        HttpClientModule,
        FormsModule
    ],
    declarations: [ 
        AppComponent 
    ],
    bootstrap: [ 
        AppComponent 
    ],
    providers: [
      LocationRepository,
      newQueryService
    ]
})

export class AppModule {

}
//Done