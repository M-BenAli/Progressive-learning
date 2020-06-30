import {Component} from '@angular/core';
import {SessionService} from "./services/session/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'progressive-learning';

  constructor(private sessionService: SessionService,
              private router: Router) {

  }


  ngOnInit(): void {
    this.sessionService.getSessionToken().subscribe(response => {
        if (response) {
          console.log(response);
          this.sessionService.setToken(response.headers.get('Authorization'));
          this.sessionService.setCurrentUser(response.body['user']);
          this.router.navigate(['learning-goals']);
        }
      },
      error => {
        console.log(error);
      },
      () => {
      }
    )
  }


}
