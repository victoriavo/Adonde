import { Component, OnInit, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent {
  
    public loggedIn:boolean;
    public name:string;
    public noSaved:boolean;

    constructor(private router: Router, private http: HttpClient){}

    ngOnInit(){
        if(localStorage.getItem('session_id') !== null){
            this.http.get('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/session/' + localStorage.getItem('session_id')
            ).subscribe(data => { console.log(data)
                if(data['valid'] == 1){
                    this.loggedIn = true;
                    this.http.post('http://ec2-18-216-113-131.us-east-2.compute.amazonaws.com/account/getsavedlocations',
                    {
                      session_id: localStorage.getItem('session_id')
                    }).subscribe(data => {console.log(data);
                        if (data['valid'] == 1) {
                            this.noSaved = false;
                            console.log("worked");
                        }else {
                            this.noSaved = true;
                            console.log("didn't work");
                    }
                  });
                }else{
                    this.loggedIn = false;
                    localStorage.removeItem('session_id');
                    this.router.navigate(['/']);
                }
            });
        }else{
            this.loggedIn = false;
            this.router.navigate(['/']);
        }

        if(this.loggedIn == true){
            
        }
    }


   
}