import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
    location_id : number;
    temperature: number;
    humidity: number;
    wind: number;
    description: string;
    isValid: boolean;
    

    constructor( route: ActivatedRoute, public http: HttpClient){
        this.location_id = route.snapshot.params['location_id'];
        this.http.get('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/weather/' + this.location_id
        ).subscribe(data => { //console.log(data)
        if(data['valid'] == 1){
            this.isValid = true;
            this.temperature = data['data']['list'][0]['main']['temp'];
            this.humidity = data['data']['list'][0]['main']['humidity'];
            this.description = data['data']['list'][0]['weather'][0]['description'];
            this.wind = data['data']['list'][0]['wind']['speed'];
        }else{
            console.log('invalid');
            this.isValid = false;
        }
        });
    }

}