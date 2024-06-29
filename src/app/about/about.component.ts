import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserType } from '../users/user-model';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  topInstructors: User[] = [];
}
