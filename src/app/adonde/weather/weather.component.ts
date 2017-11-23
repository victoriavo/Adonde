import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

    constructor( public router: Router, public http: HttpClient){}

    ngOnInit(){
        this.http.get('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/weather/1'
        ).subscribe(data => { console.log(data)
        if(data['valid'] == 1){
            console.log('yay');
        }else{
            console.log('invalid');
            //this.router.navigate(['/']);
        }
        });
    }

}