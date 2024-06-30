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

  getUrl(): string {
    return this.apiUrl;
  }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl);
  }

  getDefaultExercise(): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrl}/create`);
  }

  getExerciseById(id: IdType): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrl}/${id}`);
  }

  getExercisesByTag(tag: string[]): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/tags/${tag.join('&')}`);
  }


  create(ex: Exercise) : Observable<Exercise> {
    return this.http.post<Exercise>(`${this.apiUrl}/${ex.id}`, ex);
  }

  update(ex: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiUrl}/${ex.id}`, ex);
  }

}
