import {Component, Injectable, EventEmitter} from '@angular/core'
import { Location, Rating} from '../../domain';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ratingService {
    public locationLibrary : Location[] = [];
    public allRatings : Rating[] = [];
    ratingsChanged: EventEmitter<Rating[]> = new EventEmitter();

    //so save all locations so you can store the reviews for each location in this service
    constructor(public http: HttpClient) {
        this.http.get<Location[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/locations').subscribe(data => {
            data.forEach(element => {
              this.locationLibrary.push(element);
              this.locationLibrary[this.locationLibrary.length-1].ratings = [];
            });
        });
    }


    public update(id: number, rating: Rating): void {
        this.locationLibrary[id-1].ratings.push(rating);
        //return this.http
        //    .put(`${this.endpoint}/${id}`,location)
        //    .catch(x => this.handleException(x));
    }

    getRatings(id:number): Rating[] {
        if(this.locationLibrary[id-1])
            return this.locationLibrary[id-1].ratings;
        else    
            return [];    
    }
    /*  
    

  
    

    constructor() {
        this.sharedQuery.budget = null as number;
        this.sharedQuery.origin = null as string;
        this.sharedQuery.startDate = null as string;
        this.sharedQuery.endDate = null as string;
        this.sharedQuery.locationCategory = null as string;
        this.sharedQuery.minDistance = null as number;
        this.sharedQuery.maxDistance = null as number;
    }

    changeQuery(newData: Query){
        this.sharedQuery = newData;
        this.queryChanged.emit(this.sharedQuery);
    }


    */

}