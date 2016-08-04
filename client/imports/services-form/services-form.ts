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
  hashtagsSelectedObject: Array<HashTag> = [];


  constructor() 
  {
    super();

    let fb = new FormBuilder();

    this.servicesForm = fb.group({
      price: [''],
      description: [''],
      type: [''],
      tags: ['']
    });
  }
  addService(service) 
  {
    debugger;
    if (this.servicesForm.valid) {
      if (Meteor.userId()) {
        //var date = this.getDateNow();
        Services.insert(<Service>{
          price: service.price,
          description: service.description,
          type: service.type,
          done: false,
          owner: Meteor.userId(),
          tags: this.hashtagsSelectedObject,
          dateCreated: null,
          consumer: null,
          dateRequest: null,
          dateDone: null,
          transfer: null
        });
        console.log("Entro en addservice");

        (<Control>this.servicesForm.controls['description']).updateValue('');
        (<Control>this.servicesForm.controls['type']).updateValue('');
        (<Control>this.servicesForm.controls['tags']).updateValue('');
        (<Control>this.servicesForm.controls['price']).updateValue('');
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
  getHashTags(hashTag) 
  {
    this.hashtagsSelectedObject = hashTag;
  }
  getDateNow()
  {  
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth()+1; //January is 0!
    var year = today.getFullYear();
    var time = today.getTime();
    return {'day' : day , 'month' : month , 'year' : year , 'time' : time};
  }
}
