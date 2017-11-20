import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../domain';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';

@Component({
    selector: 'pass-reset',
    templateUrl: './pass-reset.component.html',
    styleUrls: ['./pass-reset.component.css']
})

export class PassResetComponent {
    public newUser = new User();
    email: string;
    reemail: string;
    changeData: FormGroup;

    constructor(private http: HttpClient) {
        this.changeData = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            reemail: new FormControl(null, [Validators.required, Validators.email])
        });

        this.changeData.valueChanges.subscribe(val => this.update(val));
    }

    public reset() {
        alert('Success');
    }

    public update(val: any) {
        this.email = val.email;
        this.reemail = val.reemail;
        this.changeData.get('reemail').setValidators([Validators.required, Validators.email, Validators.pattern(this.email)]);
        this.changeData.get('email').setValidators([Validators.required, Validators.email, Validators.pattern(this.reemail)]);
    }

    public match(control: AbstractControl){

    }
}