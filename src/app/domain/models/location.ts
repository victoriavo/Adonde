import { Rating } from "./rating";

export class Location{  [x: string]: any;

    location_id: number;
    city: string;
    country: string;
    description: string;
    imagePath: string;
    rating?: number;
    ratings?: Rating[];
    mapPath: string;
    //category: string;
}