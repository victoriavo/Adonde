import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})

export class LogoutComponent {
    public localurl: string;

    constructor(public router: Router, public http: HttpClient, public route: ActivatedRoute) {
        this.localurl = '/';
        route.url.subscribe(data => {
            for (var segment of data) {
                this.localurl += segment.toString() + '/';
            }
            this.localurl = this.localurl.slice(0, -1);            
        });
    }

    public logout() {
        this.http.post('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/logout',
            {
                session_id: localStorage.getItem('session_id')
            }
        ).subscribe(data => {
            localStorage.removeItem('session_id');
            let navigationExtras: NavigationExtras = {
                queryParams: {
                    "localurl": this.localurl
                }
            };
            this.router.navigate(["redirect"], navigationExtras);
        });


    }

}