import 'reflect-metadata';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { Component }   from '@angular/core';
import { Mongo }       from 'meteor/mongo';
import { Router, ROUTER_DIRECTIVES }  from '@angular/router';
import { MeteorComponent } from 'angular2-meteor';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './singup.html';

@Component({
  selector: 'signup',
  directives: [ ROUTER_DIRECTIVES],
  template
})
export class Signup extends MeteorComponent {
  signupForm: ControlGroup;
  error: string;

  constructor(private router: Router) {
    super();

    let fb = new FormBuilder();

    this.signupForm = fb.group({
      username: [''],
      email: [''],
      password: ['']
    });

    this.error = '';
  }

  signup(credentials, username, password, repeatPassword, email) 
  {
    if (this.signupForm.valid) 
    {
      if(password === repeatPassword) 
      {
        Accounts.createUser({username: username, email: email, password: password}, (err) => {
        if (err) 
        {
          this.error = err;
        }
        else 
        {
          Meteor.loginWithPassword(email, password, (err) => {
            if (err) 
            {
              this.error = err;
            }
            else 
            {
              this.router.navigate(['/']);
            }
            });
          }
        });
      }
      else
        this.error = "Las contraseñas no coinciden";
    }
  }
}
