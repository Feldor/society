import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export let Transfer = new Mongo.Collection<Transfer>('transfer');