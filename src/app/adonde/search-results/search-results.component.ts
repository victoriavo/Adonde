import { Component, OnInit, Input, DoCheck, AfterContentInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { Query } from '../../domain/models/query';
import { Location, LocationRepository, newQueryService, Environment, Flight } from '../../domain';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';



@Component({
  selector: 'search-results',
  templateUrl: 'search-results.component.html',
  styleUrls: ['search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  public environments: Environment[] = [];
  public locationCategories = ['Beach', 'Mountains', 'Urban'];
  public newQuery = new Query;
  //public locations: Location[];
  public locations: Location[] = [];
  public selectedLocation: Location = this.locations[0];
  public results: Location[];
  public advancedShowing: boolean;
  public checks: boolean[] = [false, false, false];
  public dropdownColors: string[] = ['', ''];
  public minmaxColor: string[] = ['text-muted', 'text-muted'];
  public select: HTMLSelectElement;
  public select2: HTMLSelectElement;
  public changeData: FormGroup;
  public optionalFields = ['locationCategory', 'minDistance', 'maxDistance', 'minRating'];
  public hiddenArray: boolean[];
  public locationIndex: number;
  public savedArray: boolean[];
  public suggestedLocations: Location[] = [];
  public allLocations: Location[] = [];
  public loggedIn: boolean = true;
  public hideSuggestions = false;
  public filteredByRatingLocations: number[] = [];
  public ratingFilteredLocationObjects: Location[] = [];
  public numOfLocations: number = 0;
  public resultsValid: boolean;

  @Input()
  public query = this.newQuery;
  public queries: Query[] = [];



  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,

    public locationRepository: LocationRepository,
    public http: HttpClient,
    public qService: newQueryService
  ) {
    this.savedArray = Array(this.numOfLocations).fill(false);
    this.resultsValid = false;
    this.changeData = new FormGroup({
      budget: new FormControl(qService.sharedQuery.budget),
      origin: new FormControl(qService.sharedQuery.origin),
      startDate: new FormControl(qService.sharedQuery.startDate),
      endDate: new FormControl(qService.sharedQuery.endDate),
      locationCategory: new FormControl({ value: qService.sharedQuery.locationCategory, disabled: true }),
      minDistance: new FormControl({ value: qService.sharedQuery.minDistance, disabled: true }),
      maxDistance: new FormControl({ value: qService.sharedQuery.maxDistance, disabled: true }),
      minRating: new FormControl({ value: qService.sharedQuery.minRating, disabled: true })
    });
    this.newQuery = qService.sharedQuery;
    if (!qService.isNull())
      this.queries.push(this.newQuery);

    //SUBSCRIBE TO SERVICE AND SERVICE SUBSCRIBE TO IT    
    qService.queryChanged.subscribe((newValue: any) => this.newQuery = newValue);
    this.changeData.valueChanges.subscribe(val => this.changeQuery(val));

    this.getNumOfLocations();

    this.http.get<Environment[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/environments').subscribe(data => {
      this.locationCategories = [];
      data.forEach(element => {
        this.environments.push(element);
        this.locationCategories.push(element.environment);
      });


    });
    if (this.queries[this.queries.length - 1]) {
      this.filteredSearch();
    }
    else {
      this.showAll();
    }

    this.checkIfLoggedIn();
    if (this.loggedIn)
      this.getSuggestedLocations();
  }

  public changeQuery(data: Query) {
    !this.newQuery.budget ? data.budget = null : data.budget = this.newQuery.budget;
    !this.newQuery.origin ? data.origin = null : data.origin = this.newQuery.origin;
    !this.newQuery.startDate ? data.startDate = null : data.startDate = this.newQuery.startDate;
    !this.newQuery.endDate ? data.endDate = null : data.endDate = this.newQuery.endDate;
    this.qService.changeQuery(data);
  }


  public ngOnInit() {
    this.select = document.getElementById('locationCategory') as HTMLSelectElement;
    this.select2 = document.getElementById('minRating') as HTMLSelectElement;
    this.advancedShowing = false;
    this.dropdownColors.fill("text-muted");

    this.checkIfLoggedIn();
  }

  public ngAfterContentInit() {

  }

  public updateSearch() {
    //remove old search and replace with new search
    this.queries.pop();
    this.queries.push(this.newQuery);
    this.locations = [];
    //this.showAll();
    if (!this.queries[this.queries.length - 1].budget &&
      !this.queries[this.queries.length - 1].startDate &&
      !this.queries[this.queries.length - 1].endDate &&
      !this.queries[this.queries.length - 1].origin &&
      !this.queries[this.queries.length - 1].minDistance &&
      !this.queries[this.queries.length - 1].maxDistance &&
      !this.queries[this.queries.length - 1].locationCategory &&
      !this.queries[this.queries.length - 1].minRating) {
      this.showAll();
    }
    else {
      this.filteredSearch();
    }
  }

  public saveSearch() {
    this.queries.push(this.newQuery);
  }

  public setLocationIndex(locationIndex: number) {
    this.locationIndex = locationIndex;
    this.selectedLocation = this.locations[locationIndex];
    console.log("locationIndex = " + locationIndex);
  }
  public viewLocationDetails(location_id: number) {
    this.router.navigateByUrl('/location/' + location_id);
  }

  public toggleAdvanced() {
    if (this.newQuery.locationCategory == null)
      this.select.selectedIndex = 0;
    this.advancedShowing = !this.advancedShowing;
  }

  public dropdownChange(x: number) {
    if (x == 0) {
      let control = this.changeData.get(this.optionalFields[0]);
      if (control.enabled)
        (this.select.selectedIndex > 0) ? this.dropdownColors[x] = "text-dark" : this.dropdownColors[x] = "text-secondary";
      else
        this.dropdownColors[x] = "text-secondary";
    } else {
      let control = this.changeData.get(this.optionalFields[3]);
      if (control.enabled)
        (this.select2.selectedIndex > 0) ? this.dropdownColors[x] = "text-dark" : this.dropdownColors[x] = "text-secondary";
      else
        this.dropdownColors[x] = "text-secondary";
    }
  }

  public minmaxChange(control: AbstractControl, x: number) {
    control.enabled ? this.minmaxColor[x - 1] = "text-dark" : this.minmaxColor[x - 1] = "text-muted";
  }

  public check(x: number) {
    let control = this.changeData.get(this.optionalFields[x]);
    control.disabled ? control.enable() : control.disable();
    x == 0 ? this.dropdownChange(0) : this.dropdownChange(1);
    this.minmaxChange(control, x);
  }

  public handleQueryUpdated(newQuery: any) {
    if (typeof newQuery === 'string')
      this.updateSearch()
    else {
      this.newQuery.budget = newQuery.budget;
      this.newQuery.origin = newQuery.origin;
      this.newQuery.startDate = newQuery.startDate;
      this.newQuery.endDate = newQuery.endDate;
    }
  }

  public removeFromView(x: number) {
    this.hiddenArray[x] = false;
  }


  public isNull(array: any[]) {
    if (array) {
      array.forEach(element => {
        if (element)
          return false;
      });
      return true;
    }
  }

  public save(location: number) {
    this.http.post('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/account/location/save',
      {
        session_id: localStorage.getItem('session_id'),
        location_id: location
      }).subscribe(data => {
        console.log(data);
        if (data['valid'] == 1) {
          this.savedArray[location] = true;
          this.getSuggestedLocations();
        } else {
          this.savedArray[location] = false;
          console.log('didnt work');
        }
      });
  }


  public unsave(location: number) {
    this.http.delete('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/account/deletesavedlocation/' + localStorage.getItem('session_id') + '/' + location
    ).subscribe(data => {
      console.log(data);
      if (data['valid'] == 1) {
        this.savedArray[location] = false;
        this.getSuggestedLocations();
      } else {
        this.savedArray[location] = true;
        console.log('didnt work');
      }
    });
  }



  public filteredSearch() {
    if (this.select)
      var locationIndex = this.select.selectedIndex; //******THIS IS THE SELECTED INDEX OF THE CURRENT QUERY******
    //console.log(locationIndex);
    this.http.post<Location[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/search/filtered/flight/locations',
      {
        "budget": this.queries[this.queries.length - 1].budget,
        "depart_date": this.queries[this.queries.length - 1].startDate,
        "return_date": this.queries[this.queries.length - 1].endDate,
        "origin": this.queries[this.queries.length - 1].origin,
        "minimum_distance": this.queries[this.queries.length - 1].minDistance,
        "maximum_distance": this.queries[this.queries.length - 1].maxDistance,
        "filtered_ids": [this.select ? this.select.selectedIndex : null]
      }).subscribe(data => {
        if (this.queries[this.queries.length - 1].minRating) {
          data.forEach(element => {
            this.locations.push(element);
          });
          this.filterByRating(this.locations); //returns array of locations with correct rating
        }
        else {
          data.forEach(element => {
            this.locations.push(element);
          });
        }

        //console.log(this.queries[this.queries.length - 1].locationCategory)
        this.hiddenArray = Array(this.locations.length).fill(true);
        this.savedArray = Array(this.numOfLocations).fill(false);

        if (this.loggedIn == true) {
          this.http.get<Location[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/account/' + localStorage.getItem('session_id') + '/location/save/get',
          ).subscribe(data => this.getSavedLocations(data));
        }

      });
  }

  public showAll() {
    //Shows all locations 
    this.http.get<Location[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/locations').subscribe(data => {
      data.forEach(element => {
        this.locations.push(element);
      });

      this.hiddenArray = Array(this.locations.length).fill(true);
      this.savedArray = Array(this.numOfLocations).fill(false);

      if (this.loggedIn == true) {
        this.http.get<Location[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/account/' + localStorage.getItem('session_id') + '/location/save/get',
        ).subscribe(data => this.getSavedLocations(data));
      }

    });
  }

  public getNumOfLocations() {
    this.http.get<Location[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/locations').subscribe(data => {
      data.forEach((element: any) => {
        this.allLocations.push(element);
        this.numOfLocations++;
      });
    });
  }

  public getSavedLocations(data: any) {
    for (var k = 0; k < this.allLocations.length; k++) {
      for (var j = 0; j < data['locations'].length; j++) {
        if (this.allLocations[k].location_id == data['locations'][j].location_id) {
          this.savedArray[data['locations'][j].location_id] = true;
        }
      }
    }
  }

  public getSuggestedLocations() {
    this.http.get<Location[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/suggestedLocations/' + localStorage.getItem('session_id')
    ).subscribe(data => {
      this.results = data;
      this.suggestedLocations = [];
      if (data['valid']) {
        this.resultsValid = true;
        data['data'].forEach((element: any) => {
          this.suggestedLocations.push(element);
        });
      } else {
        this.resultsValid = false;
      }
    });
  }

  public checkIfLoggedIn() {
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

  public hideRecommendedLocations() {
    this.hideSuggestions = true;
  }

  public filterByRating(locations: Location[]) {
    this.http.get<any[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/location_ratings/min/'
      + this.queries[this.queries.length - 1].minRating)
      .subscribe(data => {
        data.forEach(element => {
          this.filteredByRatingLocations.push(element['location_id']);
        });

        //check if the location_id of the locations that match by filter are the same as the ones that match by rating
        //if so, add them to the locations array
        if (this.filteredByRatingLocations) {
          locations.forEach(element => {
            this.filteredByRatingLocations.forEach(inner_element => {
              if (inner_element == element['location_id']) {
                if (this.ratingFilteredLocationObjects)
                  this.ratingFilteredLocationObjects.push(element);
              }
            });
          });
          if (this.ratingFilteredLocationObjects)
            this.locations = this.ratingFilteredLocationObjects;
        }

      });
  }
}