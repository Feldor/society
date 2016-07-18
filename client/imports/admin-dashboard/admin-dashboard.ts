import { Component }   from '@angular/core';
import { HashTagList }     from '../hashtag-list/hashtag-list';
import { HashTagForm } from '../hashtag-form/hashtag-form';
import { Mongo }       from 'meteor/mongo';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { MeteorComponent } from 'angular2-meteor';

import template from './admin-dashboard.html';

@Component({
  selector: 'admin-dashboard',
  template,
  directives: [HashTagForm, HashTagList, ROUTER_DIRECTIVES]
})
export class AdminDashboard extends MeteorComponent{
  constructor() {
  	super();
  }
}