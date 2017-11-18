import { Component, OnInit, Input, ViewChild, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Query } from '../../domain/models/query';
import { Location, LocationRepository } from '../../domain';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'search-results',
  templateUrl: 'search-results.component.html',
  styleUrls: ['search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  private defaultSelect = 'Destination Category';
  private locationCategories = ['Beach','Mountains','Urban'];
  private newQuery = new Query;
  private locations: Location[];
  private advancedShowing: boolean;
  private checks: boolean[] = [false,false,false];
  private dropdownColor: string;
  private select: HTMLSelectElement

  form = new FormGroup({
    categories: new FormControl(null, Validators.required)
  });
  
  @Input()
  public query = this.newQuery;
  public queries : Query[] = [];

  constructor(
    private locationRepository : LocationRepository
  ) {}

  public ngOnInit() {
    this.select = document.getElementById('sel1') as HTMLSelectElement;
    this.locations = this.locationRepository.getAll();
    this.advancedShowing = false;
    this.dropdownColor = "text-muted";
  }

  private updateSearch() {
    //remove old search and replace with new search
    this.queries.pop();
    this.queries.push(this.newQuery);
    this.newQuery = new Query;
  }

  private saveSearch() {
    this.queries.push(this.newQuery);
  }

  private toggleAdvanced() {
    if(this.newQuery.locationCategory == null )
      this.select.selectedIndex = 0;
    this.advancedShowing = !this.advancedShowing;
  }

  private dropdownChange() {
    if(this.select.selectedIndex > 0)
      this.dropdownColor = "text-dark";
    else
      this.dropdownColor = "text-secondary";
  }

  private check(x: number) {
    this.checks[x] = !this.checks[x];
  }

  private handleQueryUpdated(newQuery: Query){
    this.newQuery = newQuery;
  }
}


