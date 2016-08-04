import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export let Request = new Mongo.Collection<Request>('request');