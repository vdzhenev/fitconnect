import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'

import { User, UserType } from './users/user-model'
import { UserService } from './users/user.service';
import { IdType } from './shared/shared-types';
import { BehaviorSubject } from 'rxjs';
import { LoggedUserService } from './users/logged-user/logged-user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink, RouterLinkActive, RouterOutlet, CommonModule,
    MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService, private loggedUserService: LoggedUserService) { }

  title = 'FitConnect';
  userType = UserType.anonymous;
  loggedUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User('', '', '', UserType.anonymous, [], [], [], '',-1));
  loggedUserNames = '';
  loggedUserId=-1;


  ngOnInit(): void {
    this.logOutUser();
  }

  logInUser(id: IdType) {
    this.loggedUserService.logInUser(id);
    this.loggedUserService.loggedUser.subscribe(resp => {
      this.loggedUser.next(resp);
      this.userType = resp.type;
      this.loggedUserNames = resp.firstName + ' ' + resp.lastName;
      this.loggedUserId=resp.id;
    });
  }

  logOutUser() {
    this.loggedUserService.logOutUser();
    this.loggedUserService.loggedUser.subscribe(resp => {
      this.loggedUser.next(resp);
      this.userType = resp.type;
      this.loggedUserNames = resp.firstName + ' ' + resp.lastName;
      this.loggedUserId=resp.id;
    });
  }

  setUser(type: UserType) {
    this.userType = type;
    this.userService.setUserType(UserType[this.userType]);
  }

}
