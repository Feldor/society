//import {loadServices} from './load-services.ts';
import {loadHahsTags} from './load-hashtags.ts';
import {Meteor} from 'meteor/meteor';
import './services.ts';
import './hashtags.ts';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';
//import { Roles } from 'meteor/alanning:roles';


//Meteor.startup(loadServices);
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

/*Meteor.startup(function () {
  var smtp = {
    username: 'feldor92@gmail.com',   // eg: server@gentlenode.com
    password: 'feldor26967696',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 465
  }

  process.env.MAIL_URL = 'smtp://feldor92@gmail.com:feldor26967696@smtp.gmail.com:465;
});

Email.send({
  from: "feldor92@gmail.com",
  to: "feldor92@gmail.com",
  subject: "Meteor Can Send Emails via Gmail",
  text: "Its pretty easy to send emails via gmail."
});*/