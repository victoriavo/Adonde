import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdondeModule } from './adonde/adonde.module'
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

const defaultRoute = '/home';

@NgModule({
    imports: [ 
        BrowserModule,
        AdondeModule,
        RouterModule.forRoot([
            { path: '', redirectTo: defaultRoute, pathMatch: 'full' }
        ]),
        HttpModule,
        JsonpModule
    ],
    declarations: [ 
        AppComponent 
    ],
    bootstrap: [ 
        AppComponent 
    ]
})

export class AppModule {

}