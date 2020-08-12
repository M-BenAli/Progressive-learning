import {Component, OnInit} from '@angular/core';
import {UnitService} from "../../services/unit.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Unit} from 'src/app/models/unit';
import {PermissionService} from "../../services/permissions/permission.service";
import {SessionService} from "../../services/session/session.service";
import {Resource} from "../../models/resource";
import {LearningGoal} from "../../models/learning-goal";

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {


  public unit: Unit;
  public editUnitName: boolean;
  // public summaryCopy: string;
  public saving: boolean;
  public learningGoal: LearningGoal;

  constructor(private unitService: UnitService, public permissionsService: PermissionService,
              public sessionService: SessionService,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.editUnitName = false;

  }

  onSave(){
    this.saving = true;
    this.unitService.update(this.unit).subscribe((unit: Unit) => {
      this.unit = unit;
    }, error => {
      console.log(error);
    }, () => {
      console.log("Updated unit", this.unit);
      this.saving = false;
    })
  }

  deleteResource(resource: Resource){
    const index = this.unit.resources.findIndex(r => r.id === resource.id);
    this.unit.resources.splice(index, 1);
  }

  updateSummary(updatedSummary: string){
    this.unit.summary = updatedSummary;
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.unitService.get(params.id).subscribe((unit: Unit) => {
        this.unit = Unit.fromJSON(unit);
        this.learningGoal = LearningGoal.fromJSON(unit['learningGoal']);
      }, (error) => {
        console.log(error);
        this.router.navigate(['**']);
      }, () => {
        // this.summaryCopy = this.unit.summary;
      });
    });
  }

}
