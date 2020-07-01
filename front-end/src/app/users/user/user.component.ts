import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  currentUser: User;
  userEmail: FormControl;

  constructor(private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient,
              private userService: UserService) {
    this.currentUser = null;
    this.userEmail = new FormControl({value: '', disabled: true}, [
      Validators.email
    ])
  }

  updateUser() {
    let reqUser = User.deepCopy(this.currentUser);
    reqUser.email = this.userEmail.value
    this.userService.update(reqUser.id, reqUser).subscribe(userData => {
      this.currentUser = User.fromJSON(userData)
    }, error => {
      console.log(error);
      this.userEmail.setErrors(error['error']['message']);
      }, () => {
      console.log(this.currentUser);
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let userID = parseInt(params.get('id'));
      this.userService.get(userID).subscribe(userData => {
        this.currentUser = User.fromJSON(userData);
      }, error => {
        console.log(error)
      }, () => {
        this.userEmail.setValue(this.currentUser.email);
      });
    }).unsubscribe();
  }

}
