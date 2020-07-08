import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {


  @Input() subjects;
  constructor() { }

  ngOnInit(): void {
  }

  someFunction() {
  }

}
