import { Component, OnInit, Input, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Location, Rating, Query, ratingService } from '../../domain';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent {
  trustedUrl: SafeResourceUrl;
  dangerousUrl: any;
  location: any;
  public results: string;
  location_id: number;
  public ratings: Rating[] = [];
  mapUrl: string;
  bgrbg: string;
  public ratingAverage: number;

  constructor(
    public http: HttpClient,
    route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public RatingService: ratingService
  ) {
    this.location = Location;
    this.location_id = route.snapshot.params['location_id'];
    this.http.get<Location>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/locations/' + this.location_id).subscribe(data => {
      // Read the result field from the JSON response.
      //this.results = JSON.stringify(data);
      this.location = data[0];
      if (this.location.location_id == 18)
        this.location.city += " City";
      this.location.city += ',';
      console.log(this.location);
      this.dangerousUrl = this.location.mapPath;
      this.trustedUrl = sanitizer.bypassSecurityTrustResourceUrl(this.dangerousUrl);
      console.log(this.dangerousUrl);
      console.log(this.trustedUrl);
      this.getAllRatings();
    });


  }

  public handleRatingUpdated(output: any) {
    this.getAllRatings();
  }

  public getAllRatings() {
    this.http.get<Rating[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/location_ratings/' + this.location_id)
      .subscribe(data => {
        //console.log(data);

        this.ratingAverage = data['average'];


      });

  }

  /*  public ngAfterViewChecked() {
     //this.getAverageRGB();
   }
 
   public getAverageRGB(imageURL?: string) {
 
     //console.log(imageURL);
 
     var imgEl = new Image();
 
     //imgEl.crossOrigin = ''; // no credentials flag. Same as img.crossOrigin='anonymous'
 
     imgEl.src = 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7';
 
     var blockSize = 5,
       defaultRGB = '#000',
       canvas = document.createElement('canvas'),
       context = canvas.getContext && canvas.getContext('2d'),
       data, width, height, rhex, ghex, bhex, rgbhex,
       i = -4,
       length,
       rgb = { r: 0, g: 0, b: 0 },
       count = 0;
 
     if (!context) {
       return defaultRGB;
     }
 
     height = imgEl.naturalHeight;
     width = imgEl.naturalWidth;
 
     context.drawImage(imgEl, 0, 0);
 
     try {
       data = context.getImageData(0, 0, width, height);
     } catch (e) {
       alert(e);
       return defaultRGB;
     }
 
     length = data.data.length;
 
     while ((i += blockSize * 4) < length) {
       ++count;
       rgb.r += data.data[i];
       rgb.g += data.data[i + 1];
       rgb.b += data.data[i + 2];
     }
 
     // ~~ used to floor values
     rgb.r = ~~(rgb.r / count);
     rgb.g = ~~(rgb.g / count);
     rgb.b = ~~(rgb.b / count);
 
     rhex = rgb.r.toString(16);
     ghex = rgb.g.toString(16);
     bhex = rgb.b.toString(16);
     rgbhex = '#' + rhex + ghex + bhex;
 
     return rgbhex;
 
   }
 */
} 