import { Component, Input, OnInit } from '@angular/core';
import { LoggedUserService } from './logged-user.service';
import { BehaviorSubject } from 'rxjs';
import { User, UserType } from '../user-model';
import { IdType } from '../../shared/shared-types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-logged-user',
  standalone: true,
  imports: [ CommonModule, RouterLink,
    MatButtonModule, MatIconModule
   ],
  templateUrl: './logged-user.component.html',
  styleUrl: './logged-user.component.css'
})
export class LoggedUserComponent implements OnInit {

  constructor(private loggedUserService: LoggedUserService) { }

  @Input() loggedUser?: User;

  ngOnInit(): void {
    this.loggedUserService.loggedUser.subscribe(u => {
      this.loggedUser=u;
    });
  }

  getUserTypeAsString(): string {
    if(this.loggedUser) {
      return UserType[this.loggedUser.type];
    }
    else
      return 'anonymous';
  }

}
