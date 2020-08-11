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
    ScientificPaper: 'fa fa-pager',
    Image: 'fa fa-image'
  }

  resourceLinks: Resource[];
  resourceImages: Resource[];
  newResource: Resource;
  resourceTypes: string[];
  @Output() deletedResource: EventEmitter<Resource>;
  selectedResourceImg: Resource;

  constructor(private unitService: UnitService, private resourceService: ResourceService,
              public permissionService: PermissionService,
              public sessionService: SessionService,
              private activatedRoute: ActivatedRoute) {
    this.resourceLinks = [];
    this.resourceImages = [];
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

  getResourceKeyFromValue(enumValue) {
    return Object.keys(ResourceTypes).find(type => ResourceTypes[type] === enumValue);
  }

  onCreate() {
    let taskID;
    this.activatedRoute.paramMap.subscribe(next => {
      taskID = next.get('id');
    }).unsubscribe();

    if (taskID) {
      this.resourceLinks = [];
      this.resourceImages = [];
      this.unitService.addResource(taskID, this.newResource).subscribe(
        (resourceData: Resource[]) => {
          resourceData.forEach(resource => {
            resource.type === 'Image' ? this.resourceImages.push(resource) : this.resourceLinks.push(resource)
          })
        }, error => {
          console.log(error);
        }, () => {
          this.newResource = null;
          console.log(this.resourceLinks)
        });
    }
  }

  onDelete(resource: Resource, index?: number, type?: string) {
    if (type === 'Image') {
      this.resourceImages.splice(index, 1);
    } else {
      this.resourceLinks.splice(index, 1);
    }
    this.resourceService.delete(resource.id).subscribe();
    this.deletedResource.emit(resource);
  }

  onCancel() {
    this.newResource = null;
  }

  onImageHover() {
    console.log("Hovering over an image");
  }

  ngOnInit(): void {
    let taskID;
    this.activatedRoute.paramMap.subscribe(next => {
      taskID = next.get('id');
    }).unsubscribe();
    this.unitService.getResources(taskID).subscribe(
      (resourceData: Resource[]) => {
        this.resourceLinks = [];
        resourceData.forEach(resource => {
          resource.type === 'Image' ? this.resourceImages.push(resource) : this.resourceLinks.push(resource)

        })
      }, error => {
        console.log(error)
      },
      () => {
      });
  }

}
