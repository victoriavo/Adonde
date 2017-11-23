import { Component, OnInit, Input } from '@angular/core';
import { Location} from '../../domain';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent {
  location: any;
  public results: string;
  location_id : number;
  
  

  constructor(public http: HttpClient, route: ActivatedRoute){
    this.location = Location;
    this.location_id = route.snapshot.params['location_id'];
    this.http.get<Location>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/locations/'+this.location_id).subscribe(data => {
      // Read the result field from the JSON response.
      //this.results = JSON.stringify(data);
      this.location= data[0];
      //console.log(this.location);
      
    });
    
  }

}