import {Component, Injectable, EventEmitter} from '@angular/core'
import {FormControl} from '@angular/forms';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { Query } from '../../domain/models/query';
import { Location, LocationRepository } from '../../domain';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class newQueryService {
    public sharedQuery = new Query;

    queryChanged: EventEmitter<Query> = new EventEmitter();

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
        for (var property in newData){
            !property && (property = null);
        }
        !newData.locationCategory && (newData.locationCategory = null);
        !newData.minDistance && (newData.minDistance = null);
        !newData.maxDistance && (newData.maxDistance = null);
        this.sharedQuery = newData;
        this.queryChanged.emit(this.sharedQuery);
    }

    isNull(){
        if(this.sharedQuery.budget == null &&
            this.sharedQuery.origin == null &&
            this.sharedQuery.startDate == null &&
            this.sharedQuery.endDate == null &&
            this.sharedQuery.locationCategory == null &&
            this.sharedQuery.minDistance == null &&
            this.sharedQuery.maxDistance == null )
            return true;
        else
            return false;
    }
}

