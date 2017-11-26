import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';

@Component({
  selector: 'edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {
  
    public loggedIn:boolean;
    public name:string;
    public email:string;
    changeData: FormGroup;
    public edited:boolean;

    constructor(private router: Router, private http: HttpClient){
        this.changeData = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            email: new FormControl(null, [Validators.required, Validators.email])
          });
          this.changeData.valueChanges.subscribe(val => this.update(val));
    }

    ngOnInit(){
        if(localStorage.getItem('session_id') !== null){
            console.log(localStorage.getItem('session_id'));
            this.http.get('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/session/' + localStorage.getItem('session_id')
            ).subscribe(data => { console.log(data)
                if(data['valid'] == 1){
                    this.loggedIn = true;
                    this.name = data['name'];
                    this.email = data['email'];
                }else{
                    this.loggedIn = false;
                    localStorage.removeItem('session_id');
                    this.router.navigate(['/']);
                }
            });
        }else{
            this.loggedIn = false;
            console.log('not logged in');
            this.router.navigate(['/']);
        }
  }
    private edit(){
        this.http.put('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/edit',
        {
            session_id : localStorage.getItem('session_id'),
            name: this.name.toString(),
            email: this.email.toString()
        }).subscribe(data => {console.log(data);
            if(data['valid'] == 1){
                this.router.navigate(['/']);
            }else{
                this.edited = false;
            }
        });
    }

    public update(item:any) {
        if(item.name){
            this.name = item.name;
        }
        if(item.email){
            this.email = item.email;
        }
    }

    public eitherValid(){
        if(this.changeData.get('name').valid || this.changeData.get('email').valid){
            return false;
        }else{
            return true;
        }
    }
}