import { HashTags } from '../collections/hashtags.ts';

export function loadHahsTags() {
  if (HashTags.find().count() === 0) {

    var hashtags = [
      {
        'name': 'test1'
      },
      {
        'name': 'test1'
      },
      {
        'name': 'test1'
      }
    ];

    for (var i = 0; i < hashtags.length; i++) {
      HashTags.insert(hashtags[i]);
    }
  }
}