import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitsRoutingModule} from './units-routing.module';
import {UnitComponent} from './unit/unit.component';
import {FormsModule} from "@angular/forms";
import {ResourcesComponent} from "../resources/resources.component";
import {UnitListComponent} from './unit-list/unit-list.component';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UnitSummaryComponent} from './unit-summary/unit-summary.component';
import {QuillModule} from "ngx-quill";


@NgModule({
    declarations: [UnitComponent, ResourcesComponent, UnitListComponent, UnitSummaryComponent],
    exports: [
        UnitListComponent
    ],
    imports: [
        CommonModule,
        UnitsRoutingModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        QuillModule.forRoot()

    ]
})
export class UnitsModule { }
