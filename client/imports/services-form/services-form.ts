import 'reflect-metadata';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { Services } from '../../../collections/services.ts';
import { Component }   from '@angular/core';
import { HashTags }     from '../../../collections/hashtags';
import { HashTagAutocomplete }     from '../hashtag-autocomplete/hashtag-autocomplete';
import { Mongo }       from 'meteor/mongo';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { MeteorComponent } from 'angular2-meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';

import template from './services-form.html';

@Component({
  selector: 'services-form',
  template,
  directives: [HashTagAutocomplete, ROUTER_DIRECTIVES]
})

export class ServicesForm extends MeteorComponent
{
  servicesForm: ControlGroup;
  hashtagsSelectedObject: Array<string>;


  constructor() 
  {
    super();

    let fb = new FormBuilder();

    this.servicesForm = fb.group({
      name: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      'public': [false],
      tags: ['']
    });
  }
  addService(service) 
  {
    if (this.servicesForm.valid) {
      if (Meteor.userId()) {
        Services.insert(<Service>{
          name: service.name,
          description: service.description,
          location: service.location,
          'public': service.public,
          owner: Meteor.userId(),
          tags: this.hashtagsSelectedObject
        });
        console.log("Entro en addservice");

        (<Control>this.servicesForm.controls['name']).updateValue('');
        (<Control>this.servicesForm.controls['description']).updateValue('');
        (<Control>this.servicesForm.controls['location']).updateValue('');
        (<Control>this.servicesForm.controls['public']).updateValue(false);
        (<Control>this.servicesForm.controls['tags']).updateValue('');
      } else {
        alert('Please log in to add a service');
      }
    }
  }
  callOtherClass()
  {
    console.log("Entro in callOtherClass()");
    console.log(this.hashtagsSelectedObject);
  }
  getHashTags(hashTag) {
    this.hashtagsSelectedObject = hashTag;
  }
}
