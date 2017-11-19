import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../../domain';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    public newUser = new User();

    constructor(private router : Router, private http: HttpClient){}
    
    public signup(){
        this.http.post('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/signup',
        {
            name: this.newUser.name.toString(),
            email : this.newUser.email.toString(),
            password : this.newUser.password.toString()
        }
      ).subscribe(data => { console.log(data);
        if(data['valid'] == 0){
          alert('Something went wrong');
        }else {
          alert('Success');
          this.router.navigate(['/login']);
        }
      },
      err => console.error(err), 
      () => console.log('done loading'));

    }

    private remember() {

    }

}