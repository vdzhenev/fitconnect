import { Injectable } from '@angular/core';
import { User, UserType } from '../user-model';
import { UserService } from '../user.service';
import { IdType } from '../../shared/shared-types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  private defaultUser = new User('','','',UserType.anonymous,[],[],[],'', -1);
  loggedUser: BehaviorSubject<User> = new BehaviorSubject<User>(this.defaultUser);

  constructor(private userService: UserService) { }

  logInUser(id: IdType) {
    this.userService.getUser(id).subscribe(user => {this.loggedUser.next(user)});
  }

  logOutUser() {
    this.loggedUser.next(this.defaultUser);
  }

}
