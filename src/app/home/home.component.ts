import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise/exercise-model';
import { ExerciseService } from '../exercise/exercise.service';
import { Course } from '../courses/course-model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CourseService } from '../courses/course.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet,
    MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  exercises: Exercise[] = [];
  totalExercises = 0;
  maxExercises = 5;
  currentExerciseIndex: number = 0;
  courses: Course[] = [];
  maxCourses = 5;
  totalCourses = 0;
  currentCourseIndex: number = 0;

  constructor(private exerciseService: ExerciseService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe(response => {
      this.exercises = response.slice(0, this.maxExercises);
      this.totalExercises = this.exercises.length;
    });
    this.courseService.getData().subscribe(response => {
      this.courses = response.slice(0, this.maxCourses);
      this.totalCourses = this.courses.length;
    });
  }

  goLeftEx(): void {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex -= 1;
    }
    else {
      this.currentExerciseIndex = this.totalExercises-1;
    }
  }

  goRightEx(): void {
    this.currentExerciseIndex = (this.currentExerciseIndex+1)%this.totalExercises;
  }

  goLeftCourse(): void {
    if (this.currentCourseIndex > 0) {
      this.currentCourseIndex -= 1;
    }
    else {
      this.currentCourseIndex = this.totalCourses-1;
    }
  }

  goRightCourse(): void {
    this.currentCourseIndex = (this.currentCourseIndex+1)%this.totalCourses;
  }
}
