
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private login(){
    alert('Success');
  }
}
