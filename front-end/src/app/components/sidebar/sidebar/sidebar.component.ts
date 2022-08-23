import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  USER_ROUTE: string;
  DASHBOARD_ROUTE: string;
  
  selectedSideBar: string;

  constructor(public sessionService: SessionService) { }

  onSelection(route: string) {
    switch(route) {
      case this.DASHBOARD_ROUTE: {
        this.selectedSideBar = this.DASHBOARD_ROUTE;
        break;
      }
      case this.USER_ROUTE: {
        this.selectedSideBar = this.USER_ROUTE;
        break;
      }
    }
  }
  

  ngOnInit(): void {
    this.USER_ROUTE = 'users/' + this.sessionService.getCurrentUser().id;
    this.DASHBOARD_ROUTE = '/dashboard'
  }

}
