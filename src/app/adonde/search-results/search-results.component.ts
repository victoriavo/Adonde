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
  environments: Environment[] = [];
  public locationCategories = ['Beach', 'Mountains', 'Urban'];
  public newQuery = new Query;
  //public locations: Location[];
  locations: Location[] = [];
  public selectedLocation: Location = this.locations[0];
  public results: string;
  public advancedShowing: boolean;
  public checks: boolean[] = [false, false, false];
  public dropdownColor: string;
  public minmaxColor: string[] = ['text-muted', 'text-muted'];
  public select: HTMLSelectElement;
  changeData: FormGroup;
  public optionalFields = ['locationCategory', 'minDistance', 'maxDistance'];
  public hiddenArray: boolean[];
  public locationIndex: number;
  public savedArray: boolean[];
  public loggedIn: boolean;

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
    this.changeData = new FormGroup({
      budget: new FormControl(qService.sharedQuery.budget),
      origin: new FormControl(qService.sharedQuery.origin),
      startDate: new FormControl(qService.sharedQuery.startDate),
      endDate: new FormControl(qService.sharedQuery.endDate),
      locationCategory: new FormControl({ value: qService.sharedQuery.locationCategory, disabled: true }),
      minDistance: new FormControl({ value: qService.sharedQuery.minDistance, disabled: true }),
      maxDistance: new FormControl({ value: qService.sharedQuery.maxDistance, disabled: true })
    });
    this.newQuery = qService.sharedQuery;
    if (!qService.isNull())
      this.queries.push(this.newQuery);

    //SUBSCRIBE TO SERVICE AND SERVICE SUBSCRIBE TO IT    
    qService.queryChanged.subscribe((newValue: any) => this.newQuery = newValue);
    this.changeData.valueChanges.subscribe(val => this.changeQuery(val));


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
    this.advancedShowing = false;
    this.dropdownColor = "text-muted";

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
      !this.queries[this.queries.length - 1].locationCategory) {
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

  public dropdownChange() {
    let control = this.changeData.get(this.optionalFields[0]);
    if (control.enabled)
      (this.select.selectedIndex > 0) ? this.dropdownColor = "text-dark" : this.dropdownColor = "text-secondary";
    else
      this.dropdownColor = "text-secondary";

  }

  public minmaxChange(control: AbstractControl, x: number) {
    control.enabled ? this.minmaxColor[x - 1] = "text-dark" : this.minmaxColor[x - 1] = "text-muted";
  }

  public check(x: number) {
    let control = this.changeData.get(this.optionalFields[x]);
    control.disabled ? control.enable() : control.disable();
    this.dropdownChange();
    this.minmaxChange(control, x);
  }

  public handleQueryUpdated(newQuery: Query) {
    this.newQuery.budget = newQuery.budget;
    this.newQuery.origin = newQuery.origin;
    this.newQuery.startDate = newQuery.startDate;
    this.newQuery.endDate = newQuery.endDate;
  }

  public removeFromView(x: number) {
    this.hiddenArray[x] = false;
  }

  isNull(array: any[]) {
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
      } else {
        this.savedArray[location] = true;
        console.log('didnt work');
      }
    });
  }

  public filteredSearch() {
    var locationIndex = this.select.selectedIndex; //******THIS IS THE SELECTED INDEX OF THE CURRENT QUERY******
    console.log(locationIndex);
    this.http.post<Location[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/search/filtered/flight/locations',
      {
        "budget": this.queries[this.queries.length - 1].budget,
        "depart_date": this.queries[this.queries.length - 1].startDate,
        "return_date": this.queries[this.queries.length - 1].endDate,
        "origin": this.queries[this.queries.length - 1].origin,
        "minimum_distance": this.queries[this.queries.length - 1].minDistance,
        "maximum_distance": this.queries[this.queries.length - 1].maxDistance,
        "filtered_ids": [this.queries[this.queries.length - 1].locationCategory]
      }).subscribe(data => {

        data.forEach(element => {
          this.locations.push(element);
        });

        console.log(this.queries[this.queries.length - 1].locationCategory)
        this.hiddenArray = Array(this.locations.length).fill(true);
        this.savedArray = Array(this.locations.length).fill(false);

      });
  }

  public showAll() {
    //Shows all locations 
    this.http.get<Location[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/locations').subscribe(data => {
      // Read the result field from the JSON response. 
      //this.results = data['location_id'];
      //this.results = JSON.stringify(data);
      //console.log(this.results);
      //console.log(this.results);
      //this.results = data['city'];
      data.forEach(element => {
        this.locations.push(element);
      });

      this.hiddenArray = Array(this.locations.length).fill(true);
      this.savedArray = Array(this.locations.length).fill(false);

    });
  }
}

