import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Flight } from '../../domain/index';

@Component({
  selector: 'flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
  location: any;
  public results: string;
  location_id : number;
  flights: Flight[] = [];
  

  constructor(public http: HttpClient, route: ActivatedRoute){
    this.location_id = route.snapshot.params['location_id'];
    this.http.get<Location>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/locations/'+this.location_id).subscribe(data => {
      this.location= data[0];
      
      this.http.get<Flight[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/flights').subscribe(data => { 
        this.results = JSON.stringify(data);
        
        data.forEach(element => {
          if(this.location){
            if(element['destination'] == this.location.city)
              this.flights.push(element);
          }
        });
        
      });
  
    });
   
    
  }
}