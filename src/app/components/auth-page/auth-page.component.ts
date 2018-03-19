import { Component, OnInit } from '@angular/core';
import { UserModel } from '@common/models/user.model';
import { Role } from '@common/enums/role.enum';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  
  user = new UserModel("","");
  roleOptions = Object.keys(Role).slice(4);

  constructor() { }

  ngOnInit() {
  }
  submit(event:Event) {
      console.log(Object.keys(Role));
      event.preventDefault();
  }
}
