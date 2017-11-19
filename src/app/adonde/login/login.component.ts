import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../domain';
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


  constructor() {
    this.changeData = new FormGroup({
      emailInput: new FormControl(null, [Validators.required, Validators.email]),
      passwordInput: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });

    this.changeData.valueChanges.subscribe(val => this.update(val));
    this.changeData.statusChanges.subscribe(val => this.update(val));
  }

  public remember() {

  }

  public update(user: User) {
    this.user = user;
  }
}