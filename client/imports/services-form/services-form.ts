import 'reflect-metadata';
import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { Services } from '../../../collections/services.ts';
import { Meteor } from 'meteor/meteor';

import template from './services-form.html';

@Component({
  selector: 'services-form',
  template
})
export class ServicesForm {
  servicesForm: ControlGroup;

  constructor() {
    let fb = new FormBuilder();

    this.servicesForm = fb.group({
      name: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      'public': [false]
    });
  }

  addService(service) {
    if (this.servicesForm.valid) {
      if (Meteor.userId()) {
        Services.insert(<Service>{
          name: service.name,
          description: service.description,
          location: service.location,
          'public': service.public,
          owner: Meteor.userId()
        });

        (<Control>this.servicesForm.controls['name']).updateValue('');
        (<Control>this.servicesForm.controls['description']).updateValue('');
        (<Control>this.servicesForm.controls['location']).updateValue('');
        (<Control>this.servicesForm.controls['public']).updateValue(false);
      } else {
        alert('Please log in to add a service');
      }
    }
  }
}