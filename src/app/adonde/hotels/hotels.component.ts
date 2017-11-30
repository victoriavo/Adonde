import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent {
    location_id: number;
    link: string;

    constructor( route: ActivatedRoute, public http: HttpClient){
        this.location_id = route.snapshot.params['location_id'];
        this.http.get('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/hotel/' + this.location_id
        ).subscribe(data => { console.log(data);
            this.link = data['link'];
        });
    }

}