import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Query, newQueryService } from '../../domain'
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  public newQuery = new Query;
  changeData: FormGroup;
  @Input() bgcolor: string;
  
  @Output() queryUpdated = new EventEmitter();

  public success : 0;
  
  constructor(qService: newQueryService){
    this.changeData = new FormGroup ({
      budget: new FormControl(qService.sharedQuery.budget),
      origin: new FormControl(qService.sharedQuery.origin),
      startDate: new FormControl(qService.sharedQuery.startDate),
      endDate: new FormControl(qService.sharedQuery.endDate)
    });
    this.newQuery = qService.sharedQuery;

    //SUBSCRIBE TO SERVICE AND SERVICE SUBSCRIBE TO IT    
    qService.queryChanged.subscribe((newValue: Query) => this.newQuery = newValue);
    this.changeData.valueChanges.subscribe(val => qService.changeQuery(val));    
  }

  ngOnChanges() {
  }

  update() {
    this.queryUpdated.emit(this.newQuery);
  }

  passQuery() {

  }
}