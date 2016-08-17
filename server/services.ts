import {Services} from '../collections/services';
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

Meteor.publish('services', function(){
  var isAvailable = { done: false };
  return Services.find({$and:[isAvailable]});
});

Meteor.publish('service', function(serviceId: string) {
  return Services.find({ _id: serviceId });
});