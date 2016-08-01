import { HashTags } from '../collections/hashtags.ts';

export function loadHahsTags() {
  if (HashTags.find().count() === 0) {

    var hashtags = [
      {
        'name': 'test1'
      },
      {
        'name': 'informatica'
      },
      {
        'name': 'idioma'
      },
      {
        'name': 'musica'
      },
      {
        'name': 'coche'
      },
      {
        'name': 'clases'
      },
      {
        'name': 'matematicas'
      },
      {
        'name': 'lengua'
      },
      {
        'name': 'ingles'
      },
      {
        'name': 'frances'
      },
      {
        'name': 'italiano'
      }
    ];

    for (var i = 0; i < hashtags.length; i++) {
      HashTags.insert(hashtags[i]);
    }
  }
}