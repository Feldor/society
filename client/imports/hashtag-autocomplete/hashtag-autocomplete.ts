import { Component }   from '@angular/core';
import { HashTags }     from '../../../collections/hashtags';
import { Mongo }       from 'meteor/mongo';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { MeteorComponent } from 'angular2-meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Output, EventEmitter} from '@angular/core'
import template from './hashtag-autocomplete.html';

@Component({
  selector: 'hashtag-autocomplete',
  template,
  directives: [ROUTER_DIRECTIVES]
})

export class HashTagAutocomplete extends MeteorComponent
{
  hashtags: Mongo.Cursor<HashTag>;
  hashtagsSelectedObject: Array<HashTag>;
  name: ReactiveVar<string> = new ReactiveVar<string>(null);
  hashTagsSelected = [];
  countSelected: number;
  errorTags: boolean = false;
  @Output() hashTagsSelectedSent: EventEmitter< Array<HashTag> > = new EventEmitter< Array<HashTag> >();



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
  {    var exist = false;
    if(event.keyIdentifier == "Enter")
    {
      var elements = this.hashtags.fetch();
      if(this.hashtags.count() > 0)
      {
        for(var i = 0; i < this.hashTagsSelected.length ; i++)
        {
          if(this.hashTagsSelected[i] == elements[0]._id ) 
          {
            exist = true;
            break;
          }
        }

        if(!exist)
        {
          this.hashTagsSelected.push(elements[0]._id);
          //debugger;
          //this.hashtagsSelectedObject.push = HashTags.findOne({_id : elements[0]._id});
          this.hashTagsSelectedSent.emit(this.hashTagsSelected);
        }
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
    //this.hashtagsSelectedObject = HashTags.find({name : {'$in': this.hashTagsSelected}});
    this.hashTagsSelectedSent.emit(this.hashtagsSelectedObject);
  }
  getHashTags() 
  {
    this.sendConsole();
  }
  sendConsole()
  {
    console.log(this.hashTagsSelected);
  }
}
