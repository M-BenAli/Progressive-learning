import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../services/session/session.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(public sessionService: SessionService) {
  }

  ngOnInit() {
  }

}
