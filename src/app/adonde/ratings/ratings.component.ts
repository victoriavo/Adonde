import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Rating, ratingService } from '../../domain/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ratings', 
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})



export class RatingsComponent {
  public ratingValues = ['1 star','2 stars','3 stars','4 stars','5 stars'];
  public newLocationRating = new Rating;
  location_id : number;

  public _ratings : Rating[] = [];
  public averageRating: number;

  ngOnInit() {
    this.getRatings();
  }
  
  @Input()
  //public ratings: Rating[] = [];
  public get ratings(): Rating[] {
    return this._ratings;
  }
  public set ratings(value: Rating[]) {
    if (this._ratings !== value) {
      this.locationRatingsChange.emit(value);
    }
    this._ratings = value;
  }

  constructor(
    public http: HttpClient,
    route: ActivatedRoute,
    public RatingService : ratingService
  ) {
    this.location_id = route.snapshot.params['location_id'];
  }  
  
  @Output()
  locationRatingsChange: EventEmitter<Rating[]> = new EventEmitter<Rating[]>();

  public addrating() {
    this.newLocationRating.date = new Date();
    this.ratings.push(this.newLocationRating); //set function name
    this.RatingService.update(this.location_id, this.newLocationRating);
    console.log(this.newLocationRating.rating);
    const body = {"location_id": this.location_id, "rating": this.newLocationRating.rating};
    this.http.put('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/rate', body
    ).subscribe(data => {
      //console.log(data); 
      //console.log(this.newLocationRating.rating)
    });
    
    this.newLocationRating = new Rating;
    this.locationRatingsChange.emit(this.ratings); //just added

  }

  public getRatings(): void {
    this.RatingService.getRatings(this.location_id);
  }

  public getRating() {
    this.averageRating = 0;

  }
}

