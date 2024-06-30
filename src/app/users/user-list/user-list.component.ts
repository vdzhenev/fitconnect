import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User, UserType } from '../user-model';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { LoggedUserService } from '../logged-user/logged-user.service';



@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterLinkActive, RouterOutlet, 
    MatButtonModule, MatCardModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  userType: string = "anonymous";

  constructor(private userService: UserService, private loggedUserService: LoggedUserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });
    this.loggedUserService.loggedUser.subscribe(u => {
      this.userType = UserType[u.type];
    });
  }

  setUser(type: string) {
    this.userService.setUserType(type);
  }
}
