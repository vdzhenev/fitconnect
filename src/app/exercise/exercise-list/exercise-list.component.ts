import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '../exercise-model';
import { ExerciseService } from '../exercise.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../users/user-model';
import { LoggedUserService } from '../../users/logged-user/logged-user.service';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterLinkActive, RouterOutlet,
    MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})

export class ExerciseListComponent implements OnInit {

  constructor(private exerciseService: ExerciseService, private loggedUserService: LoggedUserService, private route: ActivatedRoute) { }

  exercises: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);
  newExercise: Exercise = new Exercise('Title', 'Content', -1, Date.now(), '', []);
  tags: BehaviorSubject<string[]>=new BehaviorSubject<string[]>([]);
  selectedTag = '';

  @Input() loggedUser?: User;

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => { 
        if(params['tags']) {
          this.getExercisesByTag([params['tags']].flat());  
        }
        else
          this.getExercises();
      });
    this.loggedUserService.loggedUser.subscribe(u => this.loggedUser = u);
  }

  getExercises(): void {
    this.exerciseService.getExercises()
      .subscribe(ex => {
        this.exercises.next(ex.sort((a, b)=>{ return a.title>b.title?1:-1}));
        this.getTags();
        this.selectedTag='All';
      });
  }

  getExercisesByTag(tag: string[]): void {
    this.exerciseService.getExercisesByTag(tag)
      .subscribe(exercises => {
        this.exercises.next(exercises.sort((a, b)=>{ return a.title>b.title?1:-1}));
        this.getTags();
        this.selectedTag=tag.flat().toString();
      });
  }

  getTags(): void {
    var arr:string[] = [];
    this.exercises.subscribe(resp => {resp.forEach(val => {arr = arr.concat(val.tags)})})
    arr = [...new Set(arr)];
    this.tags.next(arr.sort());
  }
}
