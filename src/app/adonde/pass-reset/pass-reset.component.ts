import { Component, OnInit, Input } from '@angular/core';
import {User} from '../../domain';

@Component({
    selector: 'pass-reset',
    templateUrl: './pass-reset.component.html',
    styleUrls: ['./pass-reset.component.css']
})

export class PassResetComponent {
    public newUser = new User();
    
    public reset(){
        alert('Success');
    }

}