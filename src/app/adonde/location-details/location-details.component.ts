import { Component, OnInit, Input } from '@angular/core';
import { Location, Rating, Query, ratingService} from '../../domain';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent {
  trustedUrl: SafeResourceUrl;
  dangerousUrl: any;
  location: any;
  public results: string;
  location_id : number;
  public ratings: Rating[] = [];
  mapUrl : string;

  constructor(
    public http: HttpClient,
    route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public RatingService : ratingService
  ){
    this.location = Location;
    this.location_id = route.snapshot.params['location_id'];
    this.http.get<Location>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/locations/'+this.location_id).subscribe(data => {
      this.location = data[0];
      
      console.log(this.location);
      this.dangerousUrl = this.location.mapPath;
      this.trustedUrl = sanitizer.bypassSecurityTrustResourceUrl(this.dangerousUrl);
      console.log(this.dangerousUrl);
      console.log(this.trustedUrl);
      
    });

    
  }

  public save(){
    if (this.location_id) {
      this.RatingService.update(this.location_id, this.location);
    } 
    
  }  

 

}