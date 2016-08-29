import 'reflect-metadata';
import { Component, provide } from '@angular/core';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';
import { provideRouter, RouterConfig, ROUTER_DIRECTIVES } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { Signup } from './imports/auth/singup.ts';
import { Login } from './imports/auth/login.ts';
import { ServicesList } from './imports/services-list/services-list.ts';
import { ServicesForm } from './imports/services-form/services-form.ts';
import { ServiceDetails } from './imports/service-details/service-details.ts';
import { AdminDashboard } from './imports/admin-dashboard/admin-dashboard.ts';
import { HashTagAutocomplete } from './imports/hashtag-autocomplete/hashtag-autocomplete.ts';
import { MeteorComponent } from 'angular2-meteor';
import { LoginButtons, InjectUser } from 'angular2-meteor-accounts-ui';
import { Meteor } from 'meteor/meteor';

import template from "./app.html"

@Component({
  selector: 'app',
  template,
  directives: [ROUTER_DIRECTIVES, LoginButtons]
})

@InjectUser()
class Society extends MeteorComponent {
  user: Meteor.User;

  constructor() {
    super();
  }

  logout() {
    this.autorun(() => {
      Meteor.logout();
    });
  }
}

const routes: RouterConfig = [
  { path: '',              		component: ServicesList },
  { path: 'service/:serviceId',	component: ServiceDetails },
  { path: 'admin',				component: AdminDashboard },
  { path: 'autocomplete',		component: HashTagAutocomplete },
  { path: 'addservice',    component: ServicesForm },
  { path: 'singup',    component: Signup },
  { path: 'login',    component: Login }
  
];

const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

bootstrap(Society, [APP_ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);
