import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-unit-summary',
  templateUrl: './unit-summary.component.html',
  styleUrls: ['./unit-summary.component.css']
})
export class UnitSummaryComponent implements OnInit {
  readonly DESCRIPTION_PLACEHOLDER: string = 'Summarize the most important points(preferably in your own words).';

  modules: object = {
    toolbar: [['bold', 'italic', 'underline', 'strike'],
      ['code-block', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'header': [1, 2, 3, false]}],
    ],
  };

  styles: object = {
    backgroundColor: 'white', minHeight: '300px', maxHeight: '500px',
    overflow: 'auto', fontSize: 'medium'
  };

  @Input() summary: string;
  @Output() updatedSummary: EventEmitter<string>;

  constructor() {
    this.updatedSummary = new EventEmitter<string>();
  }

  updateSummary() {
    // console.log(this.summary);
    this.updatedSummary.emit(this.summary);
  }


  ngOnInit(): void {

  }

}





