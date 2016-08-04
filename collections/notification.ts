import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export let Notification = new Mongo.Collection<Notification>('notification');