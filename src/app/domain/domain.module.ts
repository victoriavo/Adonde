import { NgModule } from '@angular/core';
import { LocationRepository } from './repositories/location-repository.service';
import { newQueryService } from './repositories/newQuery.service';

@NgModule({
  imports: [
  ],
  providers: [
    LocationRepository,
    newQueryService
  ],
  exports: [
    
  ]
})
export class DomainModule { 
    
}