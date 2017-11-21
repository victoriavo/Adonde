import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../domain';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  public newUser = new User();
  changeData: FormGroup;
  public success: boolean = true;

  constructor(private router: Router, private http: HttpClient) {
    this.changeData = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      reemail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
    this.changeData.valueChanges.subscribe(val => this.update(val));

  }

  public signup() {
    this.http.post('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/signup',
      {
        name: this.newUser.name.toString(),
        email: this.newUser.email.toString(),
        password: this.newUser.password.toString()
      }
    ).subscribe(data => {console.log(data);
      if (data['valid'] == 0) {
        this.success = false;
      } else {
        this.success = true;
        alert('Success');
        this.router.navigate(['/login']);
      }
    },
      err => console.error(err),
      () => console.log('done loading'));

  }

  public remember() {

  }

  public update(user: User){
    this.newUser = user;
    this.changeData.get('reemail').setValidators([Validators.required, Validators.email, Validators.pattern(this.newUser.email)]);
  }

}