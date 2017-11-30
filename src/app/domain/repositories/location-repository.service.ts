import { Injectable } from "@angular/core";
import { Location } from './../models/location';

@Injectable()
export class LocationRepository {
    public locations: Location[] = []; //will probably delete this
    /*
    public locations: Location[] = [
        {
            name: 'Buenos Aires',
            country: 'Argentina',
            //description: 'Visit Buenos Aires!',
            //imagePath: 'https://colabcdn.azureedge.net/-/media/Images/Buenos-Aires/PCOM_INSIDE_ARGENTINA_1_1280X720.jpg?w=896&h=504',
            //category: 'beach'
        },
        {
            name: 'Munich',
            country: 'Germany',
            //description: 'Visit Munich and drink beer in the Englisch Gardens!',
            //imagePath: 'https://cdn.getyourguide.com/niwziy2l9cvz/4AiMiO0KVy8SS0Oe6oGigI/67b0b26d6845402449f5914356532e2e/munich-Marienplatz-1112x630.jpg',
            //category: 'mountains'
        },
        {
            name: 'New York City',
            country: 'USA',
            //description: 'Visit New York City!',
            //imagePath: 'https://media.timeout.com/images/103444978/image.jpg',
            //category: 'urban'
        },
        {
            name: 'London',
            country: 'UK',
            //description: 'Visit London!',
            //imagePath: 'https://media.timeout.com/images/103042848/image.jpg',
            //category: 'urban'
        },
        {
            name: 'Barcelona',
            country: 'Spain',
            //description: 'Visit Barcelona!',
            //imagePath: 'https://www.happycow.net/blog/wp-content/uploads/2014/07/barcelona-spain.jpg',
            //category: 'urban'
        }
    ];
    */

    public getAll() : Location[] {
       return this.locations;
    }

    //public getById(id: number): location {
    //    return this.locations[id -1];
    //}
}