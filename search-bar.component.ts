import { Component, OnInit, Input } from '@angular/core';

//import { Product, ProductReview } from '../../domain';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Input()
  public success : 0;
  
  constructor() {
  }
}