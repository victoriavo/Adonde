import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Flight, newQueryService, Query } from '../../domain/index';

@Component({
  selector: 'flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
  public newQuery = new Query;
  qService: newQueryService
  location: any;
  public results: string;
  location_id : number;
  flights: Flight[] = [];
  recommendedFlights : Flight[] = [];
  
  @Input()
  public query = this.newQuery;

  constructor(
    public http: HttpClient,
    route: ActivatedRoute,
    qService: newQueryService
    ){
    this.newQuery = qService.sharedQuery;
    console.log(this.newQuery);
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

      
      this.http.post<Flight[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/search/flight/location/id',
      { 
        "budget" : this.newQuery.budget,
        "depart_date" : this.newQuery.startDate,
        "return_date" : this.newQuery.endDate,
        "origin" : this.newQuery.origin,
        "destination" : this.location.city,
        "minimum_distance": this.newQuery.minDistance,
        "maximum_distance" : this.newQuery.maxDistance
      }).subscribe(data => {
  
      data.forEach(element => {
        this.recommendedFlights.push(element);
      });
      this.results = JSON.stringify(data);
      console.log('recommended flights' + this.results);
  
      });
  
  
    });
   
    
  }
}
   
 