import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})

export class LogoutComponent {

    private logout(){
        alert('Success');
    }

}