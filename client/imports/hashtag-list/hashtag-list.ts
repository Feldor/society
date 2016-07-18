import { Component }   from '@angular/core';
import { HashTags }     from '../../../collections/hashtags';
import { Mongo }       from 'meteor/mongo';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { MeteorComponent } from 'angular2-meteor';
import { ReactiveVar } from 'meteor/reactive-var';

import template from './hashtag-list.html';

@Component({
  selector: 'hashtag-list',
  template,
  directives: [ROUTER_DIRECTIVES]
})
export class HashTagList extends MeteorComponent{
  hashtags: Mongo.Cursor<HashTag>;
  name: ReactiveVar<string> = new ReactiveVar<string>(null);

  constructor() {
    super();

    this.subscribe('hashtags', () => {
      this.hashtags = HashTags.find();
    }, true);

  }

  removeHashTag(hashtag) {
    HashTags.remove(hashtag._id);
  }

  search(value: string) {
    this.name.set(value);
  }
}
