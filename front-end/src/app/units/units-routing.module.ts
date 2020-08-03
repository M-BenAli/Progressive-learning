import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnitComponent} from "./unit/unit.component";


const routes: Routes = [
  { path: 'learning-goals/:id/units/:id', component: UnitComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { }
