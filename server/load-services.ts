import { Services } from '../collections/services.ts';

export function loadServices() {
  if (Services.find().count() === 0) {

    var services = [
      {
        'name': 'Dubstep-Free Zone',
        'description': 'Can we please just for an evening not listen to dubstep.',
        'location': 'Palo Alto',
        'public': true,
        'tags': []
      },
      {
        'name': 'All dubstep all the time',
        'description': 'Get it on!',
        'location': 'Palo Alto',
        'public': true,
        'tags': []
      },
      {
        'name': 'Savage lounging',
        'description': 'Leisure suit required. And only fiercest manners.',
        'location': 'San Francisco',
        'public': false,
        'tags': []
      }
    ];

    for (var i = 0; i < services.length; i++) {
      Services.insert(services[i]);
    }
  }
}