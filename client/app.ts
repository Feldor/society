import 'reflect-metadata';
import { Component, provide } from '@angular/core';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';
import { provideRouter, RouterConfig, ROUTER_DIRECTIVES } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { ServicesList } from './imports/services-list/services-list.ts';
import { ServiceDetails } from './imports/service-details/service-details.ts';
import { AdminDashboard } from './imports/admin-dashboard/admin-dashboard.ts';
import { HashTagAutocomplete } from './imports/hashtag-autocomplete/hashtag-autocomplete.ts';

import template from "./app.html"

@Component({
  selector: 'app',
  template,
  directives: [ROUTER_DIRECTIVES]
})
class Socially {}

const routes: RouterConfig = [
  { path: '',              		component: ServicesList },
  { path: 'service/:serviceId',	component: ServiceDetails },
  { path: 'admin',				component: AdminDashboard },
  { path: 'autocomplete',		component: HashTagAutocomplete }
];

const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

bootstrap(Socially, [APP_ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);
