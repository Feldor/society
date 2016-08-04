import {Services} from '../collections/services';
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

function buildQuery(serviceId: string, location: string): Object {
  var isAvailable = {
    $or: [
      {
        $and: [
          { owner: this.userId },
          { owner: { $exists: true } }
        ]
      }
    ]
  };

  if (serviceId) {
    return { $and: [{ _id: serviceId }, isAvailable] };
  }

  //let searchRegEx = { '$regex': '.*' + (location || '') + '.*', '$options': 'i' };

  //return { $and: [{ location: searchRegEx }, isAvailable] };
  return { $and: [isAvailable] };
}

Meteor.publish('services', function(options: Object, location: string) {
  Counts.publish(this, 'numberOfServices',
    Services.find(buildQuery.call(this, null, location)), { noReady: true });
  return Services.find(buildQuery.call(this, null, location), options);
});

Meteor.publish('service', function(serviceId: string) {
  return Services.find(buildQuery.call(this, serviceId));
});