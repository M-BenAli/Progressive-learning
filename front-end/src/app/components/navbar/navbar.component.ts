import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../services/session/session.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(public sessionService: SessionService) {
  }

  onLogOut() {
    this.sessionService.logOut().subscribe(next => {
      console.log(next);
    }, error => {
      console.log(error);
    }, () => {
      console.log('Logged out!');

    });
  }

  ngOnInit() {
  }

}
