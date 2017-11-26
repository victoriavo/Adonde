import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location, Activity } from '../../domain/index';


@Component({
  selector: 'activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent {
  location: any;
  public results: string;
  location_id : number;
  activities: Activity[] = [];
  
  

  constructor(
    public http: HttpClient,
    route: ActivatedRoute,
  ){
    this.location = Location;
    this.location_id = route.snapshot.params['location_id'];
    this.http.get<Activity[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/search/activities/'+this.location_id).subscribe(data => {
      this.results = JSON.stringify(data);
      console.log(this.results);
      data.forEach(element => {
        this.activities.push(element);
      });
    });
  }


}