import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Rating } from '../../domain/index';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})



export class RatingsComponent {
  public ratingValues = ['1 star', '2 stars', '3 stars', '4 stars', '5 stars'];
  public newLocationRating = new Rating;
  location_id: number;
  public ratingCount: number;
  public ratingAverage: number;
  public loggedIn: boolean;
  public changeData: FormGroup;

  @Input()
  public locationRatings: Rating[] = [];

  @Output()
  newRatingSubmitted = new EventEmitter();

  constructor(
    public http: HttpClient,
    public router: Router,
    route: ActivatedRoute
  ) {
    this.location_id = route.snapshot.params['location_id'];
    this.changeData = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [Validators.required])
    });
    this.changeData.valueChanges.subscribe(val => this.updateRating(val));
    this.getAllRatings();
  }

  public ngOnInit() {

    if (localStorage.getItem('session_id') !== null && localStorage.getItem('session_id') != '0') {
      console.log(localStorage.getItem('session_id'));
      this.http.get('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/session/' + localStorage.getItem('session_id')
      ).subscribe(data => {
        console.log(data)
        if (data['valid'] == 1) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
          localStorage.removeItem('session_id');
        }
      });
    } else {
      this.loggedIn = false;
      console.log('not logged in');
    }


  }


  public getAllRatings() {
    this.http.get<Rating[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/location_ratings/' + this.location_id)
      .subscribe(data => {
        console.log(data);

        this.ratingAverage = data['average'];
        this.ratingCount = data['numRatings'];

      });

  }



  public addLocationRating() {
    this.newLocationRating.date = new Date();
    console.log(this.newLocationRating.rating);
    const body = { "location_id": this.location_id, "rating": this.newLocationRating.rating };
    this.ratingCount ++;
    document.getElementById("name").innerText = '';
    var select = document.getElementById("rating") as HTMLSelectElement;
    select.selectedIndex = 0;
    this.changeData.get('rating').setValue(null);
    this.changeData.get('name').setValue('');

    this.http.put('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/rate', body
    ).subscribe(data => {
      console.log(data);
      this.newRatingSubmitted.emit("put!");
      this.getAllRatings();
      this.locationRatings.push(this.newLocationRating);
      this.newLocationRating = new Rating;
    });
    // 

  }

  public goToLogin() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "location_id": this.location_id
      }
    };
    this.router.navigate(["login"], navigationExtras);
    // this.router.navigateByUrl('/login');
  }

  public updateRating(x: any) {
    this.newLocationRating.userName = x.name;
    this.newLocationRating.rating = x.rating;
  }

  public dropdownColor() {
    return this.newLocationRating.rating != null ? "text-dark" : "text-muted";
  }
}

