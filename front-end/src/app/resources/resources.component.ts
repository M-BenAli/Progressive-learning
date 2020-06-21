import {Component, OnInit} from '@angular/core';
import {Resource, ResourceTypes} from "../models/resource";
import {FormControl, FormGroup} from "@angular/forms";
import {TaskService} from "../services/task.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  resources: Resource[];
  newResource: Resource;
  resourceTypes: string[];

  constructor(private taskService: TaskService,
              private activatedRoute: ActivatedRoute) {
    this.resources = [];
    this.resourceTypes = Object.values(ResourceTypes)

  }

  renderNewResource() {
    /*this.newResource = new FormGroup({
      url: new FormControl(''),
      type: new FormControl('')
    });*/
    this.newResource = new Resource('', ResourceTypes.Wikipedia);
  }

  onCreateResource() {
    let taskID;
    this.activatedRoute.paramMap.subscribe(next => {
      taskID = next.get('id');
    }).unsubscribe();

    if (taskID) {
      this.taskService.addResource(taskID, this.newResource).subscribe(
        (resourceData: []) => {
          this.resources = [];
          resourceData.forEach(resource => {
            this.resources.push(Resource.fromJSON(resource));
          })
        }, error => {
          console.log(error);
        }, () => {
          console.log(this.resources)
        });
    }
  }

  onCancel() {
    this.newResource = null;
  }

  ngOnInit(): void {
    let taskID;
    this.activatedRoute.paramMap.subscribe(next => {
      taskID = next.get('id');
    }).unsubscribe();
    this.taskService.getResources(taskID).subscribe(
      (resourceData: Resource[]) => {
        this.resources = [];
        resourceData.forEach(resource => {
          this.resources.push(Resource.fromJSON(resource));
        })
      }, error => {
        console.log(error)
      },
      () => {});
  }

}
