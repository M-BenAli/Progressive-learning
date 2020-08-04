import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SessionService} from "../../services/session/session.service";
import {passwordMatchValidator} from "../../helpers/form-validators";
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private fB: FormBuilder,
              private sessionService: SessionService,
              private router: Router) {
    this.signUpForm = this.fB.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(5)
        ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5)])
    }, {validators: passwordMatchValidator});
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  onSubmit(formData) {
    this.sessionService.signUp(formData).subscribe(resp => {
      const token = resp.headers.get('Authorization');
      this.sessionService.setToken(token);
      this.sessionService.setCurrentUser(User.fromJSON(resp.body));
    }, (error) => {
      console.log(error);
    }, () => {
      if (this.sessionService.isAuthenticated()) {
        this.router.navigate(['dashboard']);
      }
    });
  }


  ngOnInit(): void {
  }

}
