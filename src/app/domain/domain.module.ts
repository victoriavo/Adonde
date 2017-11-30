import { NgModule } from '@angular/core';
import { LocationRepository } from './repositories/location-repository.service';
import { newQueryService } from './repositories/newQuery.service';
import { ratingService } from './repositories/ratingService.service';

@NgModule({
  imports: [
  ],
  providers: [
    LocationRepository,
    newQueryService,
    ratingService
  ],
  exports: [
    
  ]
})
export class DomainModule { 
    
}