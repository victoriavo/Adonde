import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

public loggedIn:boolean;

    @Input() textcolor: string;

    ngOnInit(){
        if(localStorage.getItem('session_id') !== null){
            console.log(localStorage.getItem('session_id'));
            this.loggedIn = true;
        }else{
            this.loggedIn = false;
            console.log('not logged in');
        }
  }

}