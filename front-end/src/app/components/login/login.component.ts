import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SessionService} from "../../services/session/session.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private sessionService: SessionService,
              private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: '',
      password: ''
    })
  }

  onLogin() {
    // console.log(this.loginForm);
    let credentials = this.loginForm.value;
    let user;
    this.sessionService.authenticate(credentials).subscribe(response => {
        // console.log(response);
        const token = response.headers.get('Authorization')
        this.sessionService.setToken(token);
        user = User.fromJSON(response.body);
        this.sessionService.setCurrentUser(user);
      }, error => {
        // console.log(error);
        this.errorMessage = error.error.message;
      },
      () => {
      this.router.navigate(['dashboard'])
        console.log("Completed authentication");
      });
  }

  ngOnInit() {
  }

}
