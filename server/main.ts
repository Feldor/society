import {loadServices} from './load-services.ts';
import {loadHahsTags} from './load-hashtags.ts';
import {Meteor} from 'meteor/meteor';
import './services.ts';
import './hashtags.ts';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';


Meteor.startup(loadServices);
Meteor.startup(loadHahsTags);

Meteor.startup(function () {

  if (Meteor.users.find().fetch().length === 0) 
  {
    var users = [
        {name:"Test1",email:"test1@example.com",roles:[]},
        {name:"Test2",email:"test2@example.com",roles:[]},
        {name:"Test3",email:"test3@example.com",roles:[]},
        {name:"Admin",email:"admin@example.com",roles:['admin']}
      ];

	for (var i = 0; i < users.length; i++) 
	{      
      console.log(users[i]);
      var id = Accounts.createUser({
        email: users[i].email,
        password: "password",
        profile: { name: users[i].name }
      });
      // email verification
      Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});
      Roles.addUsersToRoles(id, users[i].roles); 
    }
  }

});