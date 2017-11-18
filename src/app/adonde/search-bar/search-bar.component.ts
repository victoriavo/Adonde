import { Component, OnInit, Input } from '@angular/core';
import { Query } from '../../domain/models/query';


@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  private newQuery = new Query;
  @Input()
  public success : 0;
  
  constructor() {
  }
}