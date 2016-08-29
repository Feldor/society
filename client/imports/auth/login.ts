import 'reflect-metadata';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { Component }   from '@angular/core';
import { Mongo }       from 'meteor/mongo';
import { Router, ROUTER_DIRECTIVES }  from '@angular/router';
import { MeteorComponent } from 'angular2-meteor';
import { Meteor } from 'meteor/meteor';

import template from './login.html';

@Component({
  selector: 'login',
  directives: [ ROUTER_DIRECTIVES],
  template
})
export class Login extends MeteorComponent {
  loginForm: ControlGroup;
  error: string;

  constructor(private router: Router) {
    super();

    let fb = new FormBuilder();

    this.loginForm = fb.group({
      username: [''],
      password: ['']
    });

    this.error = '';
  }

  login(credentials, username, password) 
  {
    if (this.loginForm.valid) 
    {
      Meteor.loginWithPassword(username, password, (err) => {
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
  }
}
