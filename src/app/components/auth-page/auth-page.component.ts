import {Component, OnInit} from '@angular/core';
import {UserModel} from '@common/models/user.model';
import {Role} from '@common/enums/role.enum';
import "@common/extensions/all.extension";
@Component({selector: 'app-auth-page', templateUrl: './auth-page.component.html', styleUrls: ['./auth-page.component.css']})
export class AuthPageComponent implements OnInit {

  user = new UserModel("", "");
  roles = Role;
  roleOptions = [0, 1, 2, 3]

  constructor() {}

  ngOnInit() {}
  submit(event : Event) {
    event.preventDefault();
  }
}
