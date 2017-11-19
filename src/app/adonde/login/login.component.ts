import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { User } from '../../domain';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user = new User();

  constructor(private http: HttpClient){}

  ngOnInit(){
    if(localStorage.getItem('email')){

    }
  }
  
  private login(){
      this.http.post('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/login',
        {
          email : this.user.email.toString(),
          password : this.user.password.toString()
        }
      ).subscribe(data => { console.log(data);
        if(data['session_id'] == 401){
          alert('Wrong email or password');
        }else {
          localStorage.setItem('session_id', data['session_id']);
        }
      },
      err => console.error(err), 
      () => console.log('done loading'));
  }

  private remember() {
      localStorage.setItem('email', this.user.email);
      localStorage.setItem('password', this.user.password);
  }


}