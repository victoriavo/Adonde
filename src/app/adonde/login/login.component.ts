import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { User } from '../../domain';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user = new User();
  changeData: FormGroup;
  inputs: AbstractControl[] = [null, null];

  constructor(private router : Router, private http: HttpClient){
    this.changeData = new FormGroup({
      emailInput: new FormControl(null, [Validators.required, Validators.email]),
      passwordInput: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
    this.changeData.valueChanges.subscribe(val => this.update(val));
    this.changeData.statusChanges.subscribe(val => this.update(val));
}

  

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
          this.router.navigate(['/']);
        }
      },
      err => console.error(err), 
      () => console.log('done loading'));
  }

  private remember() {
      localStorage.setItem('email', this.user.email);
      localStorage.setItem('password', this.user.password);
  }

  public update(user: User) {
    this.user = user;
  }

}