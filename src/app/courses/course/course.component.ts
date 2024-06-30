import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../course-model';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { User } from '../../users/user-model';
import { LoggedUserService } from '../../users/logged-user/logged-user.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private courseService: CourseService, private loggedUserService: LoggedUserService, private userService: UserService) {};

  @Input() loggedUser?: User;
  @Input() course?: Course;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(id)
      .subscribe(course => {
        this.course = course;
      });
    this.loggedUserService.loggedUser.subscribe(u => this.loggedUser = u);
  }

  add(): void {
    if(this.loggedUser && this.course) {
      this.loggedUser.courses.push(this.course.id);
      this.userService.updateUser(this.loggedUser);
    }
  }

  remove(): void {
    if(this.loggedUser && this.course) {
      this.loggedUser.courses = this.loggedUser.courses.filter((val)=>val!=this.course?.id);
      this.userService.updateUser(this.loggedUser);
    }
  }
}
