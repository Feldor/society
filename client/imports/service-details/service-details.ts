import { Component } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Services } from '../../../collections/services.ts';
import { Meteor } from 'meteor/meteor';
import { RequireUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';

import template from './service-details.html';

@Component({
  selector: 'service-details',
  template,
  directives: [ROUTER_DIRECTIVES]
})
@RequireUser()
export class ServiceDetails extends MeteorComponent {
  serviceId: string;
  service: Service;

  constructor(private route: ActivatedRoute) {
    super();
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

  saveService(service) 
  {
    if (Meteor.userId()) {
      Services.update(service._id, {
        $set: {
          name: service.name,
          description: service.description,
          location: service.location
        }
      });
    } else {
      alert('Please log in to change this service');
    }
  }
  
}
