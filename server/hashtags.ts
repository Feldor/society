import {HashTags} from '../collections/hashtags';
import {Meteor} from 'meteor/meteor';

Meteor.publish('hashtags', function() {
  return HashTags.find();
});