import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise-model';
import { ExerciseService } from '../exercise.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, 
    MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})
export class ExerciseListComponent implements OnInit{

  constructor(private exerciseService: ExerciseService) {}

  exercises: Exercise[] = [];

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises(): void {
    this.exerciseService.getExercises()
      .subscribe(exercises => {
        this.exercises = exercises;
      });
  }

}
