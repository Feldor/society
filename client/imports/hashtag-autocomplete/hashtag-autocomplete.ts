import { Component }   from '@angular/core';
import { HashTags }     from '../../../collections/hashtags';
import { Mongo }       from 'meteor/mongo';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { MeteorComponent } from 'angular2-meteor';
import { ReactiveVar } from 'meteor/reactive-var';

import template from './hashtag-autocomplete.html';

@Component({
  selector: 'hashtag-autocomplete',
  template,
  directives: [ROUTER_DIRECTIVES]
})

export class HashTagAutocomplete extends MeteorComponent
{
  hashtags: Mongo.Cursor<HashTag>;
  name: ReactiveVar<string> = new ReactiveVar<string>(null);
  hashTagsSelected = [];
  errorTags: boolean = false;

  constructor() 
  {
    super();

    this.subscribe('hashtags', () => {
      this.hashtags = HashTags.find();
    }, true);
  }


  search(value: string) 
  {
    this.errorTags = false;
    this.name.set(value);
    this.subscribe('hashtags', () => {
      this.hashtags = HashTags.find({name : {'$regex': this.name.get()}});
    }, true);
  }
  addTagToList(event) 
  {
    var exist = false;
    if(event.keyIdentifier == "Enter")
    {
      var elements = this.hashtags.fetch();
      if(this.hashtags.count() > 0)
      {
        for(var i = 0; i < this.hashTagsSelected.length ; i++)
        {
          if(this.hashTagsSelected[i] == elements[0].name ) 
          {
            exist = true;
            break;
          }
        }
        
        if(!exist)
          this.hashTagsSelected.push(elements[0].name);
        else
          this.errorTags = true;

        this.subscribe('hashtags', () => {
          this.hashtags = HashTags.find();
        }, true);
        $("#autocompleteTags").val('');
      }
    }
  }
  removeSelected(name) 
  {
    var copyArray = [];
    for(var i = 0; i < this.hashTagsSelected.length ; i++)
    {
      if(this.hashTagsSelected[i] != name) 
      {
        copyArray.push(this.hashTagsSelected[i]);
      }
    }
    this.hashTagsSelected = copyArray;
  }
}
