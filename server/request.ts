import {Request} from '../collections/request';
import {Meteor} from 'meteor/meteor';

Meteor.publish('request', function() {
  return Request.find();
});