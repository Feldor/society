import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export let Request = new Mongo.Collection<Request>('request');

Request.allow({
  insert: function() {
    let user = Meteor.user();
    
    return !!user;
  },
  update: function() {
    let user = Meteor.user();
    
    return !!user;
  },
  remove: function() {
    let user = Meteor.user();
    
    return !!user;
  }
});
