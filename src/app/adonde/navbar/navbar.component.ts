import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

public loggedIn:boolean;

    @Input() textcolor: string;

    constructor(private router: Router, private http: HttpClient) {}

    ngOnInit(){
        if(localStorage.getItem('session_id') !== null){
            console.log(localStorage.getItem('session_id'));
            this.http.get('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/session/' + localStorage.getItem('session_id')
            ).subscribe(data => { console.log(data)
                if(data['valid'] == 1){
                    this.loggedIn = true;
                }else{
                    this.loggedIn = false;
                    localStorage.removeItem('session_id');
                }
            });
        }else{
            this.loggedIn = false;
            console.log('not logged in');
        }
  }

}