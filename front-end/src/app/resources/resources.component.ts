import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Resource, ResourceTypes} from "../models/resource";
import {UnitService} from "../services/unit.service";
import {ActivatedRoute} from "@angular/router";
import {ResourceService} from "../services/resource.service";
import {SessionService} from "../services/session/session.service";
import {PermissionService} from "../services/permissions/permission.service";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  readonly RESOURCE_ICONS: object = {
    Wikipedia: 'fab fa-wikipedia-w',
    Github: 'fab fa-github',
    Youtube: 'fab fa-youtube',
    Article: 'far fa-newspaper',
    Book: 'fas fa-book',
    ScientificPaper: 'fa fa-pager'
  }

  resources: Resource[];
  newResource: Resource;
  resourceTypes: string[];
  @Output() deletedResource: EventEmitter<Resource>;

  constructor(private taskService: UnitService, private resourceService: ResourceService,
              public permissionService: PermissionService,
              public sessionService: SessionService,
              private activatedRoute: ActivatedRoute) {
    this.resources = [];
    this.resourceTypes = Object.values(ResourceTypes)
    this.deletedResource = new EventEmitter();
  }

  renderNewResource() {
    /*this.newResource = new FormGroup({
      url: new FormControl(''),
      type: new FormControl('')
    });*/
    this.newResource = new Resource('', ResourceTypes.Wikipedia);
  }

  getResourceKeyFromValue(enumValue){
   return Object.keys(ResourceTypes).find(type => ResourceTypes[type] === enumValue);
  }

  onCreate() {
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
          this.newResource = null;
          console.log(this.resources)
        });
    }
  }

  onDelete(resource: Resource, index: number){
    this.resources.splice(index, 1);
    this.resourceService.delete(resource.id).subscribe();
    this.deletedResource.emit(resource);
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
