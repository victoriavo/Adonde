import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../domain';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';

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

    constructor(private http: HttpClient) {
        this.changeData = new FormGroup({
            oldpass: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            newpass: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            renpass: new FormControl(null, [Validators.required, Validators.minLength(8)])
        });

        this.changeData.valueChanges.subscribe(val => this.update(val));
    }

    public reset() {
        alert('Success');
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