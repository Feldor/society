import 'reflect-metadata';
import { Component } from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { HashTags } from '../../../collections/hashtags';
import { Meteor } from 'meteor/meteor';

import template from './hashtag-form.html';

@Component({
  selector: 'hashtag-form',
  template
})
export class HashTagForm {
  hashtagForm: ControlGroup;

  constructor() {
    let fb = new FormBuilder();

    this.hashtagForm = fb.group({
      name: ['', Validators.required]
    });
  }

  addHashTag(hashtag) {
    if (this.hashtagForm.valid) {
      HashTags.insert(<HashTag>{
        name: hashtag.name,
      });

      (<Control>this.hashtagForm.controls['name']).updateValue('');
    } 
    else {
      alert('Please log in as admin to add a hastag ');
    }
  }
}