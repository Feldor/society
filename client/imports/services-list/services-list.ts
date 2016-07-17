import { Component }   from '@angular/core';
import { Services }     from '../../../collections/services';
import { ServicesForm } from '../services-form/services-form';
import { Mongo }       from 'meteor/mongo';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { LoginButtons } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { PaginationService, PaginatePipe, PaginationControlsCmp } from 'angular2-pagination';

import template from './services-list.html';

@Component({
  selector: 'services-list',
  viewProviders: [PaginationService],
  template,
  directives: [ServicesForm, ROUTER_DIRECTIVES, LoginButtons, PaginationControlsCmp],
  pipes: [PaginatePipe]
})
export class ServicesList extends MeteorComponent{
  services: Mongo.Cursor<Service>;
  pageSize: number = 10;
  curPage: ReactiveVar<number> = new ReactiveVar<number>(1);
  nameOrder: ReactiveVar<number> = new ReactiveVar<number>(1);
  servicesSize: number = 0;
  location: ReactiveVar<string> = new ReactiveVar<string>(null);

  constructor() {
    super();

    this.autorun(() => {
      let options = {
        limit: this.pageSize,
        skip: (this.curPage.get() - 1) * this.pageSize,
        sort: { name: this.nameOrder.get() }
      };

      this.subscribe('services', options, this.location.get(), () => {
        this.services = Services.find({}, { sort: { name: this.nameOrder.get() } });
      }, true);
    });

    this.autorun(() => {
      this.servicesSize = Counts.get('numberOfServices');
    }, true);
  }

  removeService(service) {
    Services.remove(service._id);
  }

  search(value: string) {
    this.curPage.set(1);
    this.location.set(value);
  }

  changeSortOrder(nameOrder: string) {
    this.nameOrder.set(parseInt(nameOrder));
  }

  onPageChanged(page: number) {
    this.curPage.set(page);
  }
}
