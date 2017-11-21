import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';

@Component({
  selector: 'delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

    public loggedIn:boolean;
    public deleted: boolean;

    constructor(private router: Router, private http: HttpClient){}

    ngOnInit(){
        if(localStorage.getItem('session_id') !== null){
            console.log(localStorage.getItem('session_id'));
            this.http.get('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/session/' + localStorage.getItem('session_id')
            ).subscribe(data => { console.log(data)
                if(data['valid'] == 1){
                    this.loggedIn = true;
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

    private delete(){
        this.http.delete('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/delete/' + localStorage.getItem('session_id')
        ).subscribe(data => { console.log(data)
            if(data['valid'] == 1){
                localStorage.removeItem('session_id');
                this.router.navigate(['/']);
            }else{
                this.deleted = false;
            }
        });

    }
}