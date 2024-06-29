import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'
import {MatIconModule} from '@angular/material/icon'
import {MatListModule} from '@angular/material/list'

import { User, UserType } from './users/user-model'
import { UserService } from './users/user.service';


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
export class AppComponent {

  constructor(private userService: UserService) {}

  title = 'FitConnect';
  userType = UserType[UserType.anonymous];

  setUser(type: UserType) {
    this.userType = UserType[type];
    this.userService.setUserType(this.userType);
  }

}
