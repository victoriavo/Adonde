import { Component, OnInit, Input } from '@angular/core';
import {User} from '../../domain';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    private newUser = new User();
    
    private signup(){
        alert('Success');
    }

}