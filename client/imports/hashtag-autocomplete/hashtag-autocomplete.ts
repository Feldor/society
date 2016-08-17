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
  name: ReactiveVar<string> = new ReactiveVar<string>(null);
  hashTagsSelected: Array<string> = [];
  hashtagsSelectedObject: Array<HashTag> = [];
  countSelected: number = 0;
  @Output() hashTagsSelectedSent: EventEmitter< Array<HashTag> > = new EventEmitter< Array<HashTag> >();

  constructor() 
  {
    super();

    this.subscribe('hashtags', () => {
      this.hashtags = /*HashTags.find()*/ null;
    }, true);
  }

  search(value: string) 
  {
    this.name.set(value);
    if(value == "") 
    {
      this.subscribe('hashtags', () => {
        this.hashtags = HashTags.find({_id : '-1'});
      }, true);    
    }
    else
    {
      this.subscribe('hashtags', () => {
        this.hashtags = HashTags.find({name : {'$regex': this.name.get()} , _id : {$nin : this.hashTagsSelected}}, {limit: 5 , sort: { name: 0 }});
      }, true);
    }
    this.countSelected = 0;
    this.hoverSelectedElement();
  }
  addTagToList(event) 
  {
    if(event.keyIdentifier == "Enter")
    {      
      if(!this.empty() && this.countSelected > 0)
      {
        var elements = this.hashtags.fetch();
        this.hashTagsSelected.push(elements[this.countSelected-1]._id);
        this.hashtagsSelectedObject = HashTags.find({_id : {$in : this.hashTagsSelected}}).fetch();
        this.hashTagsSelectedSent.emit(this.hashtagsSelectedObject);

        this.subscribe('hashtags', () => {
          this.hashtags = HashTags.find({_id : '-1'});
        }, true);
        $("#autocompleteTags").val('');
      }
      this.countSelected = 0;
    }
  }
  addTagToListClick(name)
  {
    var elements = this.hashtags.fetch();
    for(var i = 0; i < elements.length ; i++)
    {
      if(elements[i].name == name) 
      {
        this.hashTagsSelected.push(elements[i]._id);
        break;
      }
    }
    this.hashtagsSelectedObject = HashTags.find({_id : {$in : this.hashTagsSelected}}).fetch();
    this.hashTagsSelectedSent.emit(this.hashtagsSelectedObject);

    this.subscribe('hashtags', () => {
      this.hashtags = HashTags.find({_id : '-1'});
    }, true);
    $("#autocompleteTags").val('');

  }
  removeSelected(name) 
  {
    var copyArray = [];
    var copyArray2 = [];
    for(var i = 0; i < this.hashtagsSelectedObject.length ; i++)
    {
      if(this.hashtagsSelectedObject[i].name != name) 
      {
        copyArray.push(this.hashtagsSelectedObject[i].name);
        copyArray2.push(this.hashtagsSelectedObject[i]._id);
      }
    }
    this.hashTagsSelected = copyArray2;
    this.hashtagsSelectedObject = HashTags.find({_id : {$in : this.hashTagsSelected}}).fetch();
    this.hashTagsSelectedSent.emit(this.hashtagsSelectedObject);
  }
  empty()
  {
    if(this.hashtags.count() > 0)
      return false;
    return true;
  }
  arrowSelectedElement(event)
  {
    if((event.keyCode == 38 || event.keyCode == 40 ) && !this.empty()) 
    {
      if(event.keyCode == 40) // up arrow
      {
        if (this.countSelected < this.hashtags.count())
        {
          this.countSelected++;
        }

      }
      else if(event.keyCode == 38) //donw arrow 
      {
        if (this.countSelected > 1)
        {
          this.countSelected--;
        }
      }
      this.hoverSelectedElement();
    }   
  }
  hoverSelectedElement()
  {
    if(this.hashtags == null || this.countSelected == 0)
      return;
    if(!this.empty())
    {
      var elements = this.hashtags.fetch();
      $('.autocompleteBoxElement').removeClass('hoverElementSelectedBox');
      $('.selectedBoxElement-' + elements[this.countSelected-1]._id).addClass('hoverElementSelectedBox');
    }
    
  }
  addExtenalHashTag(tagName)
  {
    console.log("Entro");
    var hashtags = HashTags.find({name : tagName , _id : {$nin : this.hashTagsSelected}}, {sort: { name: 0 }});
    var elements = hashtags.fetch();
    if(elements.length > 0) 
    {
      this.hashTagsSelected.push(elements[0]._id);
      this.hashtagsSelectedObject = HashTags.find({_id : {$in : this.hashTagsSelected}}).fetch();
      this.hashTagsSelectedSent.emit(this.hashtagsSelectedObject);
    }
  }
 
}
