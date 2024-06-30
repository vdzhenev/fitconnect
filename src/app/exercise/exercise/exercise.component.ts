import { Component, Input, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { Exercise } from '../exercise-model';
import { User } from '../../users/user-model';
import { IdType } from '../../shared/shared-types';
import { UserService } from '../../users/user.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips'
import { LoggedUserService } from '../../users/logged-user/logged-user.service';



@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet,
    MatCardModule, MatIconModule, MatButtonModule, MatChipsModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent implements OnInit {

  @Input() exercise?: Exercise;
  @Input() loggedUser?: User;
  authhorNames: string = 'Author';

  constructor(
    private exerciseService: ExerciseService,
    private loggedUserService: LoggedUserService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getExercise();
    this.loggedUserService.loggedUser.subscribe(u => this.loggedUser = u);
  }

  getExercise(): void {
    let param = this.route.snapshot.paramMap.get('id');
    const id = Number(param);
    this.exerciseService.getExerciseById(id)
      .subscribe(exercise => {
        this.exercise = exercise;
        this.getAuthorNames(exercise.authorId);
      });
  }

  getAuthorNames(id: IdType | undefined): void {
    if (id) {
      this.userService.getUser(id)
        .subscribe(user => this.authhorNames = user.firstName + ' ' + user.lastName);
    };
  }
}
