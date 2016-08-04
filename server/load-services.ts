import { Services } from '../collections/services.ts';

export function loadServices() {
  if (Services.find().count() === 0) {

    var services = [
      {
        'description': 'Can we please just for an evening not listen to dubstep.',
        'done': false,
        'type': true,
        'tags': []
      },
      {
        'description': 'Get it on!',
        'done': false,
        'type': true,
        'tags': []
      },
      {
        'description': 'Leisure suit required. And only fiercest manners.',
        'done': false,
        'type': false,
        'tags': []
      }
    ];

    for (var i = 0; i < services.length; i++) {
      Services.insert(services[i]);
    }
  }
}