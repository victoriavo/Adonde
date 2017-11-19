import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../../domain';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    public newUser = new User();

    constructor(private http: HttpClient){}
    
    public signup(){
        this.http.post('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/signup',
        {
            name: this.newUser.name.toString(),
            email : this.newUser.email.toString(),
            password : this.newUser.password.toString()
        }
      ).subscribe(res => console.log(res));
      
    }

    private remember() {

    }

}