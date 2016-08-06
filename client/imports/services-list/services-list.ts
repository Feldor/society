import { Component }   from '@angular/core';
import { Services }     from '../../../collections/services';
import { ServicesForm } from '../services-form/services-form';
import { Mongo }       from 'meteor/mongo';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { MeteorComponent } from 'angular2-meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { HashTagAutocomplete }     from '../hashtag-autocomplete/hashtag-autocomplete';

import template from './services-list.html';

@Component({
  selector: 'services-list',
  template,
  directives: [HashTagAutocomplete, ServicesForm, ROUTER_DIRECTIVES]
})
export class ServicesList extends MeteorComponent{
  services: Mongo.Cursor<Service>;
  hashtagsSelectedObject: Array<HashTag> = [];
  countHashTag: number = 0;

  constructor() {
    super();

    this.autorun(() => {
      /*let options = {
        limit: this.pageSize,
        skip: (this.curPage.get() - 1) * this.pageSize,
        sort: { name: this.nameOrder.get() }
      };*/

      this.subscribe('services', () => {
        this.services = Services.find();
      }, true);
    });
  }

  removeService(service) {
    Services.remove(service._id);
  }

  consoleLog(value)
  {
    console.log(value);
  }
  getHashTags(hashTag) 
  {
    this.hashtagsSelectedObject = hashTag;
  }
}
