import { Component, OnInit, Input } from '@angular/core';
import {User} from '../../domain';
import {Http, HttpModule, Jsonp} from '@angular/http';

@Component({
    selector: 'results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})

export class ResultsComponent {

    googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyA_3lkgW2sF3oAb0VLZTsGmU70l56I16so'
    });

    private newUser = new User();

    resultArray = new Array<Object>();

    constructor(private jsonp: Jsonp, private http: Http) {
        
    }

    ngOnInit() {
        this.http.get('http://localhost:1337/maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Dallas,TX&destinations=Barcelona&key=AIzaSyBaU4Eirj2UWMy-zKuc37UO3qC2p97Y7Gs')
                                                            .map(response => response.json())
                                                            .subscribe(result => this.resultArray = result);

        //this.googleMapsClient.distanceMatrix({origins: "DFW", destinations: "BCN"})
    }

    destinations = [['Barcelona', 'Spain', 'BCN', ],['Paris', 'France', 'CDG'],['London', 'England', 'LHR']]

    

}