import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ExerciseListComponent } from './exercise/exercise-list/exercise-list.component';
import { ExerciseComponent } from './exercise/exercise/exercise.component';
import { UserComponent } from './users/user/user.component';
import { CourseComponent } from './courses/course/course.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'exercises', component: ExerciseListComponent },
  { path: 'exercises/:id', component: ExerciseComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CourseComponent },
  { path: 'about', component: AboutComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserComponent }
];
