import {loadServices} from './load-services.ts';
import {Meteor} from 'meteor/meteor';
import './services.ts';

Meteor.startup(loadServices);