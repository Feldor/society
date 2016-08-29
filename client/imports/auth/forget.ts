import 'reflect-metadata';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { Component }   from '@angular/core';
import { Mongo }       from 'meteor/mongo';
import { Router, ROUTER_DIRECTIVES }  from '@angular/router';
import { MeteorComponent } from 'angular2-meteor';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './forget.html';

@Component({
  selector: 'forget',
  directives: [ROUTER_DIRECTIVES],
  template
})
export class Forget extends MeteorComponent {
  forgetForm: ControlGroup;
  error: string;

  constructor(private router: Router) {
    super();

    let fb = new FormBuilder();

    this.forgetForm = fb.group({
      email: ['']
    });

    this.error = '';
  }

  forget(credentials, email) {
    if (this.forgetForm.valid) {
      Accounts.forgotPassword({ email: email}, (err) => {
        if (err) {
          this.error = err;
        }
        else {
          this.router.navigate(['/']);
        }
      });
    }
  }
}
