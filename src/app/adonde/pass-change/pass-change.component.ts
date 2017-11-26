import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../domain';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'pass-change',
    templateUrl: './pass-change.component.html',
    styleUrls: ['./pass-change.component.css']
})

export class PassChangeComponent {
    public newUser = new User();
    oldpass: string;
    newpass: string;
    renpass: string;
    changeData: FormGroup;
    public changed: boolean;

    constructor(private router: Router, private http: HttpClient) {
        this.changeData = new FormGroup({
            oldpass: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            newpass: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            renpass: new FormControl(null, [Validators.required, Validators.minLength(8)])
        });

        this.changeData.valueChanges.subscribe(val => this.update(val));
    }

    public change() {
        this.http.put('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/updatepassword',
        {
          session_id: localStorage.getItem('session_id'),
          old_password: this.oldpass,
          new_password: this.newpass
        }
      ).subscribe(data => {console.log(data);
        if (data['valid'] == 1) {
            this.router.navigate(['/edit']);
        }else {
          this.changed = false;
          console.log("didn't work");
        }
      });
    }

    public update(val: any) {
        this.oldpass = val.oldpass;
        this.newpass = val.newpass;
        this.renpass = val.renpass;
        this.changeData.get('renpass').setValidators([Validators.required, Validators.minLength(8), Validators.pattern(this.newpass)]);
    }

    public match(control: AbstractControl){

    }
}