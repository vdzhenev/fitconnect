import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from './exercise-model';
import { IdType } from '../shared/shared-types';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private apiUrl = 'http://localhost:3000/api/exercises';
  constructor(private http: HttpClient) { }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl);
  }

  getExerciseById(id: IdType): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrl}/${id}`);
  }

}
