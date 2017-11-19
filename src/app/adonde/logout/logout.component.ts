import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})

export class LogoutComponent {


    constructor(private http: HttpClient){}

    public logout(){
        this.http.post('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/logout',
        {
          session_id : localStorage.getItem('session_id').toString()
        }
      ).subscribe(data => console.log(data));

      localStorage.removeItem('session_id');

    }

}