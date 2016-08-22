import { Component } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Services } from '../../../collections/services.ts';
import { Request } from '../../../collections/request.ts';
import { Meteor } from 'meteor/meteor';
import { RequireUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { Mongo }       from 'meteor/mongo';
import { DisplayNamePipe } from '../shared/display-name.pipe';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';

import template from './service-details.html';

@Component({
  selector: 'service-details',
  template,
  directives: [ROUTER_DIRECTIVES],
  pipes: [DisplayNamePipe]

})
@RequireUser()
export class ServiceDetails extends MeteorComponent {
  serviceId: string;
  service: Service;
  requests: Mongo.Cursor<Request>;
  countRequest: number;
  options = {
              isOwner: false,
              hasContacted: false,
              isCompleted: false
            };

  constructor(private route: ActivatedRoute) {
    super();

    this.autorun(() => {
      this.subscribe('requests');
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.serviceId = params['serviceId'];

      this.subscribe('service', this.serviceId, () => {
        this.service = Services.findOne(this.serviceId);
      }, true);
    });
  }

  openService(serviceID)
  {
    this.serviceId = serviceID;
    this.service = Services.findOne(this.serviceId);

    this.requests = Request.find({_idService : this.serviceId , owner:Meteor.userId()});

    this.options.isOwner= this.isOwner();
    this.options.hasContacted = this.hasContacted();
    this.options.isCompleted = this.isCompleted();
    this.countRequest = this.requests.count();
    
    $(".searchTitleHeader").hide();
    $(".searchContent").hide();
    $(".foundTitle").show();
    $(".foundContent").show();
  }

  closeService()
  {
    $(".foundTitle").hide();
    $(".foundContent").hide();
    $(".searchTitleHeader").show();
    $(".searchContent").show();    
  }
  
  removeService()
  {
    if(this.isOwner()) 
    {
      Services.remove(this.serviceId);
      this.closeService();
    } 
  }

  addResponse()
  {
    if(!this.hasContacted()) 
    {
      Request.insert(<Request>{
        _idService: this.service._id,
        owner: Meteor.userId()
      });
      this.openService(this.serviceId);
    }
  }

  removeResponse()
  {
    if(this.hasContacted()) 
    {
      let request = this.requests.fetch();
      Request.remove(request[0]._id);
      this.openService(this.serviceId);
    }
  }

  isOwner() : boolean
  {
    if(this.service == undefined)
      return;
    if(this.service.owner == Meteor.userId())
      return true;
    return false;   
  }
  hasContacted() : boolean
  {
    if(this.service == undefined)
      return;
    if(this.requests != undefined) 
    {
      var element = this.requests.fetch();
      if(element.length > 0)
        return true;
    }
    return false;
  }
  isCompleted() : boolean
  {
    if(this.service == undefined)
      return;
    return this.service.done;
  }

  saveService(service) 
  {
    if (this.isOwner() && !this.isCompleted()) {
      Services.update(service._id, {
        $set: {
          description: service.description,
          price: service.price
        }
      });
    } else {
      alert('Please log in to change this service');
    }
  }
  editMode(value: boolean)
  {
    if(value) 
    {
      $('.serviceFormContent').val(this.service.description);
      $('#typeRangeInput').val(this.service.type);
      $('#priceRangeInput').val(this.service.price);
      $('.editMode').show();
      $('.profileService').hide();
    }
    else
    {
      $('.editMode').hide();
      $('.profileService').show();
    }
  }

}
