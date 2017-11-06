import { Component, OnInit, Input } from '@angular/core';
import {User} from '../../domain';

@Component({
    selector: 'pass-change',
    templateUrl: './pass-change.component.html',
    styleUrls: ['./pass-change.component.css']
})

export class PassChangeComponent {
    private newUser = new User();
    
    private change(){
        alert('Success');
    }

}