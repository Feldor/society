import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export let Credit = new Mongo.Collection<Credit>('credit');