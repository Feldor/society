import {Request} from '../collections/request';
import {Meteor} from 'meteor/meteor';

Meteor.publish('requests', function(){
  return Request.find();
});

Meteor.publish('request-service', function(serviceId: string) {
  return Request.find({_idService:serviceId});
});