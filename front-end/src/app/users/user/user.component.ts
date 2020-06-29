import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, ParamMap, Params} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  currentUser: User;

  constructor(private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient,
              private userService: UserService) {
    this.currentUser = null;
  }

  updateUser() {
    console.log(this.currentUser);
    this.userService.update(this.currentUser.id, this.currentUser).subscribe(userData => {
      this.currentUser = User.fromJSON(userData)
    }, error => {
      console.log(error)
    }, () => {

    })
  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let userID = parseInt(params.get('id'));
      this.userService.get(userID).subscribe(userData => {
        this.currentUser = User.fromJSON(userData);
      }, error => {
        console.log(error)
      }, () => {

      });
    }).unsubscribe();
  }

}
