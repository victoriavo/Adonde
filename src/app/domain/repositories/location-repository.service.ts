import { Injectable } from "@angular/core";
import { Location } from './../models/location';
import { Observable } from "rxjs";

@Injectable()
export class LocationRepository {
    private locations: Location[] = [
        {
            name: 'Buenos Aires',
            description: 'Visit Buenos Aires!',
            imageName: 'buenosaires.jpg',
            category: 'beach'
        },
        {
            name: 'Munich',
            description: 'Visit Munich and drink beer in the Englisch Gardens!',
            imageName: 'munich.jpg',
            category: 'mountains'
        },
        {
            name: 'New York City',
            description: 'Visit New York City!',
            imageName: 'newyorkcity.jpg',
            category: 'urban'
        },
        {
            name: 'London',
            description: 'Visit London!',
            imageName: 'london.jpg',
            category: 'urban'
        },
        {
            name: 'Barcelona',
            description: 'Visit Barcelona!',
            imageName: 'barcelona.jpg',
            category: 'urban'
        }
    ];

    public getAll() : Location[] {
       return this.locations;
    }

    //public getById(id: number): Product {
    //    return this.products[id -1];
    //}
}