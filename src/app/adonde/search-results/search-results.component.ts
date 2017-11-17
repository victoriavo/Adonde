import { Component, OnInit, Input } from '@angular/core';
import { Location, Query, LocationRepository } from '../../domain';


@Component({
  selector: 'search-results',
  templateUrl: 'search-results.component.html',
  styleUrls: ['search-results.component.css'],

})
export class SearchResultsComponent implements OnInit {
  private locationCategories = ['Beach','Mountains','Urban'];
  private newQuery = new Query;
  private locations: Location[];
  
  @Input()
  public query = this.newQuery;
  public queries : Query[] = [];
  

  constructor(
    private locationRepository : LocationRepository
  ) {}

  public ngOnInit() {
    this.locations = this.locationRepository.getAll();
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
  
}


