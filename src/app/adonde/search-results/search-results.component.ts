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

    });

  }


  public ngOnInit() {
    this.select = document.getElementById('locationCategory') as HTMLSelectElement;
    this.advancedShowing = false;
    this.dropdownColor = "text-muted";
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
}


