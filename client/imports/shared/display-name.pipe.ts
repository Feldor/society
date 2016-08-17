import { Pipe } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { MeteorComponent } from 'angular2-meteor';

 
@Pipe({
  name: 'displayName'
})
export class DisplayNamePipe extends MeteorComponent{
  constructor() {
    super();

    this.autorun(() => {
      this.subscribe('users', true);
    });
  }

  transform(userID: string): string 
  {
    var user = Meteor.users.findOne(userID);

    if (!user) {
      return '';
    }
 
    if (user.username) {
      return user.username;
    }
 
    if (user.emails) {
      return user.emails[0].address;
    }

    return '';
  }
}