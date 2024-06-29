import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router'
import { User } from '../user-model';
import { UserType } from '../user-model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterLinkActive, RouterOutlet,],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  constructor(
    private userService: UserService, 
    private route: ActivatedRoute) {}

  @Input() user?: User;
  

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
      });
  }

  getTypeFromString(type: keyof typeof UserType): UserType {
    return UserType[type];
  }
}
