import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SessionService} from "../../services/session/session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router, private sessionService: SessionService) {
    this.username = ""
    this.password= ""
  }

  onLogin(){
      this.sessionService.login(this.username, this.password)
  }

  ngOnInit() {
  }

}
