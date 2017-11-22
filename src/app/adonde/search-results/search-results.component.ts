import { Component, OnInit, Input, DoCheck, AfterContentInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { Query } from '../../domain/models/query';
import { Location, LocationRepository, newQueryService } from '../../domain';
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
  public locationCategories = ['Beach', 'Mountains', 'Urban'];
  public newQuery = new Query;
  //public locations: Location[];
  locations: Location[] = [];
  public results: string;
  private advancedShowing: boolean;
  private checks: boolean[] = [false, false, false];
  private dropdownColor: string;
  private minmaxColor: string[] = ['text-muted', 'text-muted'];
  private select: HTMLSelectElement;
  changeData: FormGroup;
  private optionalFields = ['locationCategory', 'minDistance', 'maxDistance'];
  private hiddenArray: boolean[];
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
    qService: newQueryService
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
    this.changeData.valueChanges.subscribe(val => qService.changeQuery(val));

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


  public ngOnInit() {
    this.select = document.getElementById('locationCategory') as HTMLSelectElement;
    this.advancedShowing = false;
    this.dropdownColor = "text-muted";

    if(localStorage.getItem('session_id') !== null && localStorage.getItem('session_id') != '0'){
      console.log(localStorage.getItem('session_id'));
      this.http.get('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/session/' + localStorage.getItem('session_id')
      ).subscribe(data => { console.log(data)
          if(data['valid'] == 1){
              this.loggedIn = true;
          }else{
              this.loggedIn = false;
              localStorage.removeItem('session_id');
          }
      });
    }else{
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
  }

  public saveSearch() {
    this.queries.push(this.newQuery);
  }

  public viewLocationDetails(location_id: number) {
    this.router.navigateByUrl('/location/' + location_id);
  }

  private toggleAdvanced() {
    if (this.newQuery.locationCategory == null)
      this.select.selectedIndex = 0;
    this.advancedShowing = !this.advancedShowing;
  }

  private dropdownChange() {
    let control = this.changeData.get(this.optionalFields[0]);
    if (control.enabled)
      (this.select.selectedIndex > 0) ? this.dropdownColor = "text-dark" : this.dropdownColor = "text-secondary";
    else
      this.dropdownColor = "text-secondary";

  }

  private minmaxChange(control: AbstractControl, x: number) {
    control.enabled ? this.minmaxColor[x - 1] = "text-dark" : this.minmaxColor[x - 1] = "text-muted";
  }

  private check(x: number) {
    let control = this.changeData.get(this.optionalFields[x]);
    control.disabled ? control.enable() : control.disable();
    this.dropdownChange();
    this.minmaxChange(control, x);
  }

  private handleQueryUpdated(newQuery: Query) {
    this.newQuery = newQuery;
  }

  private removeFromView(x: number) {
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

  private save(location: number){
    this.savedArray[location] = true;
    this.http.post('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/account/location/save',
    {
      session_id: localStorage.getItem('session_id'),
      location_id: location
    }).subscribe(data => {console.log(data);
      if (data['valid'] == 1) {
        this.savedArray[location] = true;
      } else {
        this.savedArray[location] = false;
        console.log('didnt work');
      }
    });
  }

  private unsave(location: number){
    this.http.delete('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/account/deletesavedlocation/' + localStorage.getItem('session_id') + '/' + location
    ).subscribe(data => {console.log(data);
      if (data['valid'] == 1) {
        this.savedArray[location] = false;
      } else {
        this.savedArray[location] = true;
        console.log('didnt work');
      }
    });
  }

  private isSaved(location: number){
    this.http.post('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/account/getsavedlocations',
    {
      session_id: localStorage.getItem('session_id')
    }).subscribe(data => {console.log(data);
        if (data['valid'] == 1) {
          if(data['locations'].find((item: any) => item.id == location) != null){
              return true;
          }else{
            return false;
          }
        }else {
            console.log("didn't work");
            return false;
        }
    });
    return false;
  }
}