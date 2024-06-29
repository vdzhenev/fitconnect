import { Component, Input, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { ActivatedRoute } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { Exercise } from '../exercise-model';
import { User } from '../../users/user-model';
import { IdType } from '../../shared/shared-types';
import { UserService } from '../../users/user.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet,
    MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent implements OnInit {
  constructor(
    private exerciseService: ExerciseService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location) { }

  @Input() exercise?: Exercise;
  @Input() loggedUser?: User;
  authhorNames: string = 'Author';

  ngOnInit(): void {
    this.getExercise();
  }

  getExercise(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.exerciseService.getExercise(id)
      .subscribe(exercise => {
        this.exercise = exercise;
        this.getAuthorNames(exercise.authorId);
      });
  }

  getUser(): void {

  }
  getAuthorNames(id: IdType | undefined): void {
    if (id) {
      this.userService.getUser(id)
        .subscribe(user => this.authhorNames = user.firstName + ' ' + user.lastName);
    };
  }
}
