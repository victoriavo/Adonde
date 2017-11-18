import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Query } from '../../domain/models/query';


@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  private newQuery = new Query;
  @Input() bgcolor: string;

  @Output() queryUpdated = new EventEmitter();

  public success : 0;
  
  constructor() {}

  update() {
    this.queryUpdated.emit(this.newQuery);
  }
}