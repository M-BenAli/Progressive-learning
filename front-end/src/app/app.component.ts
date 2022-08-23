import {Component} from '@angular/core';
import {SessionService} from "./services/session/session.service";
import {Router} from "@angular/router";
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'progressive-learning';
  loading: boolean;
  currentUser: User; 

  constructor(private sessionService: SessionService,
              private router: Router) {
    this.loading = false;
  }


  ngOnInit(): void {
    this.loading = true;
    if (!this.sessionService.getAuthenticationToken()) {
      this.sessionService.getSessionToken().subscribe(response => {
          if (response.headers.has('Authorization') && response.body) {
            // console.log(response);
            this.sessionService.setToken(response.headers.get('Authorization'));
            this.sessionService.setCurrentUser(response.body['user']);
          } else {
            // console.log("Routing back to login page..");
            this.router.navigate(['login']);
          }
        },
        error => {
          console.log(error);
        },
        () => {
          this.loading = false;
          this.currentUser = this.sessionService.getCurrentUser();
        }
      );
    }
  }


}
