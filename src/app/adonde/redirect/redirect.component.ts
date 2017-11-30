import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent {
  public backurl: string;

  constructor(public router: Router, public route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.router.navigateByUrl(params['localurl']);
    });

  }

}