import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { User } from '../../domain';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Location as ALocation } from '@angular/common';
import { Location } from '../../domain/models/location';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public user = new User();
  changeData: FormGroup;
  wantRemember: boolean;
  location_id: number;
  backurl: string;
  locations: Location[] = [];
  currentCity: string;
  return: boolean;
  public loggedIn: boolean = true;

  constructor(public router: Router, public http: HttpClient, public route: ActivatedRoute, public location: ALocation) {
    this.return = false;
    this.location_id = -1;
    this.currentCity = '';
    this.changeData = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
    this.changeData.valueChanges.subscribe(val => this.update(val));

    this.http.get<Location[]>('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/locations').subscribe(data => {
      data.forEach(element => {
        this.locations.push(element);
      });
      if (this.location_id > 0)
        this.currentCity = this.locations[this.location_id - 1].city;
    });

    this.route.queryParams.subscribe(params => {
      if (params.location_id) {
        this.location_id = params.location_id;
        this.backurl = '/location/' + this.location_id.toString();
      } else if (params.returnurl) {
        this.backurl = params.returnurl;
        this.return = true;
      } else {
        this.backurl = '/';
      }
    });
    this.wantRemember = false;
  }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.changeData.get('email').setValue(localStorage.getItem('email'));
      document.getElementById('remember').setAttribute("checked", "");
      this.remember();
    }
    this.location.replaceState("/login");

  }

  public login() {
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
        this.router.navigate([this.backurl]);
      } else {
        this.loggedIn = false;
      }
    });
  }

  public remember() {
    this.wantRemember = !this.wantRemember;
  }


  public update(user: User) {
    this.user = user;
  }
}