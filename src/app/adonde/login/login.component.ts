import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { User } from '../../domain';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public user = new User();
  changeData: FormGroup;
  wantRemember: boolean;
  public loggedIn: boolean = true;

  constructor(private router: Router, private http: HttpClient) {
    this.changeData = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
    this.changeData.valueChanges.subscribe(val => this.update(val));

    this.wantRemember = false;
  }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.changeData.get('email').setValue(localStorage.getItem('email'));
      document.getElementById("remember").setAttribute("checked", "");
      this.remember();
    }
  }

  private login() {
    if (this.changeData.valid) {
      this.wantRemember ? localStorage.setItem('email', this.user.email) : localStorage.removeItem('email');
    }

    this.http.post('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/login',
      {
        email: this.user.email.toString(),
        password: this.user.password.toString()
      }
    ).subscribe(data => {
      console.log(data);
      if (data['session_id'] != 401) {
        localStorage.setItem('session_id', data['session_id']);
        this.router.navigate(['/']);
      }else {
        this.loggedIn = false;
        console.log("didn't work");
      }
    });
  }

  private remember() {
    this.wantRemember = !this.wantRemember;
  }


  public update(user: User) {
    this.user = user;
  }
}