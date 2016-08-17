import { Component, ViewChild }   from '@angular/core';
import { Services }     from '../../../collections/services';
import { ServicesForm } from '../services-form/services-form';
import { Mongo }       from 'meteor/mongo';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { MeteorComponent } from 'angular2-meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { HashTagAutocomplete }     from '../hashtag-autocomplete/hashtag-autocomplete';
import { DisplayNamePipe } from '../shared/display-name.pipe';
import { ServiceDetails }     from '../service-details/service-details';




import template from './services-list.html';

@Component({
  selector: 'services-list',
  template,
  directives: [HashTagAutocomplete, ServiceDetails, ServicesForm, ROUTER_DIRECTIVES],
  pipes: [DisplayNamePipe]

})
export class ServicesList extends MeteorComponent{
  services: Mongo.Cursor<Service>;
  hashtagsSelectedObject: Array<HashTag> = [];
  countHashTag: number = 0;
  auxElement: number = 1;
  @ViewChild(HashTagAutocomplete) hashTagAutocomplete:HashTagAutocomplete;
  @ViewChild(ServiceDetails) serviceDetails:ServiceDetails;


  options = {
              type: 0,
              price: 0,
              tags: null
            };

  constructor() {
    super();

    this.autorun(() => {
      

      this.subscribe('services', () => {
        //this.services = Services.find({done:true});
        this.services = Services.find();
      }, true);
    });
  }

  /*removeService(service) {
    Services.remove(service._id);
  }*/

  consoleLog(value)
  {
    console.log(value);
  }
  changeInputRangeDisabled()
  {
    if ($('#checkBoxPrice').is(':checked')) 
    {
      $( "#priceRangeInput" ).prop( "disabled", true );
    }
    else
    {
      $( "#priceRangeInput" ).prop( "disabled", false );
    }

  }
  
  changeListService()
  {
    this.options.type = parseInt($('#typeRangeInput').val());

    if(this.options.type == 2) 
    {
      this.options.type = 0;
    }
    else if(this.options.type == 3)
    {
      this.options.type = 2;
    }

    if ($('#checkBoxPrice').is(':checked')) 
    {
      this.options.price = 0;
    }
    else
    {
      this.options.price = parseInt($('#priceRangeInput').val());
    }

    this.subscribe('services', () => {
      var query = {};
      var hashTagsQuery = {};
      if(this.options.type != 0) 
      {
        if(this.options.price != 0) 
        {
          query = {$and:[{type:this.options.type} , {price:{$lte:this.options.price}} ]};
        }
        else
        {
          query = {$and:[{type:this.options.type} ]};
        }
      }
      else
      {
        if(this.options.price != 0) 
        {
          query = {$and:[{price:{$lte:this.options.price}} ]};
        }
        else
        {
          query = {};
        }
      }
      if(this.options.tags != null) 
      {
        if(this.options.tags.length > 0)
        {
          hashTagsQuery = {tags: {$in: this.options.tags}};
          this.services = Services.find({$and: [query , hashTagsQuery] } , {sort: {tags:1}} );
        }
        else
        {
          this.services = Services.find(query);
        }
      }
      else
      {
        this.services = Services.find(query);
      }
        

    }, true);
  }
  
  getHashTags(hashTag) 
  {
    this.options.tags = hashTag;
    this.changeListService();
  }
  changeServiceTag(tagName)
  {
    this.hashTagAutocomplete.addExtenalHashTag(tagName);
  }
  changeServiceType(type)
  {
    $("#typeRangeInput").val(type);
    this.changeListService();
  }
  openServiceDetail(serviceID)
  {
    this.serviceDetails.openService(serviceID);
  }
}
