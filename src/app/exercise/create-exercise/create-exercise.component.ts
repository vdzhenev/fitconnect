import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Exercise } from '../exercise-model';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { ExerciseService } from '../exercise.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { User, UserType } from '../../users/user-model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { LoggedUserService } from '../../users/logged-user/logged-user.service';
import { shallowEquals } from '../../shared/utils';
import { DialogService } from '../../core/dialog.service';

@Component({
  selector: 'app-create-exercise',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule,],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-exercise.component.html',
  styleUrl: './create-exercise.component.css'
})
export class CreateExerciseComponent implements OnInit, OnDestroy, OnChanges {

  @Input() exercise: Exercise = new Exercise('Title', 'Content', -1, Date.now(), '', []);
  loggedUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User('', '', '', 1, [], [], [], ''));
  loggedUserType: BehaviorSubject<string> = new BehaviorSubject<string>('anonymous');
  @Output() exerciseModified = new EventEmitter<Exercise>();
  @Output() exerciseCanceled = new EventEmitter<void>();
  isCanceled = false;

  form: FormGroup = this.buildForm();

  validationMessages = {
    title: {
      required: 'Post name is required.',
      minlength: 'Postname must be at least 2 characters long.',
      maxlength: 'Postname cannot be more than 60 characters long.'
    },
    content: {
      minlength: 'Description must be at least 2 characters long.',
      maxlength: 'Description cannot be more than 6000 characters long.'
    },
    imageUrl: {
      pattern: 'Image URL should be valid (ex. http://example.com/image/path.jpeg).'
    }
  };

  formErrors = {
    title: '',
    content: '',
    imageUrl: ''
  };

  get isNewExercise() {
    return !this.exercise || !this.exercise.id;
  }

  private statusSubscription: Subscription | undefined;

  constructor(private router: Router, private fb: FormBuilder, private exerciseService: ExerciseService, private loggedUserService: LoggedUserService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.exerciseService.getDefaultExercise().subscribe(ex => {
      this.exercise = ex;
    });
    this.loggedUserService.loggedUser.subscribe(u => {
      this.loggedUser.next(u);
      this.loggedUserType.next(UserType[u.type]);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const postChange = changes['post'];
    if (postChange && postChange.currentValue !== postChange.previousValue) {
      this.reset();
    }
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

  getLoggedUserType(): string {
    let type: string = '';
    this.loggedUserType.subscribe(t => type = t);
    return type;
  }

  reset() {
    if (this.form && this.exercise) {
      this.form.reset(this.exercise);
    }
  }

  cancelPost() {
    this.exerciseCanceled.emit();
    this.isCanceled = true;
    this.router.navigate([this.exerciseService.getUrl]);
  }

  public canDeactivate(): Observable<boolean> | boolean {
    // Allow navigation if no user or the user data is not changed
    // tslint:disable-next-line:prefer-const
    let rawFormPost = this.form?.getRawValue() as Exercise;
    // delete rawFormPost.id;
    const { id, ...prod_without_id } = this.exercise;
    if (this.isCanceled || shallowEquals(prod_without_id, rawFormPost)) {
      return true;
    }
    // Otherwise ask the user to confirm loosing changes using the dialog service
    return this.dialogService.confirm('Discard changes?');
  }

  protected onStatusChanged() {
    if (!this.form) { return; }
    const form = this.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      // this.formErrors[field] = '';
      const control = form.get(field);

      if (control && (control.dirty || control.touched) && control.invalid) {
        // const messages = this.validationMessages[field];
        for (const key in control.errors) {
          // this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  buildForm() {
    return this.fb.group({
      id: { value: this.exercise?.id, disabled: true },
      title: [this.exercise?.title,
      [Validators.required, Validators.minLength(2), Validators.maxLength(60)]
      ],
      content: [this.exercise?.content,
      [Validators.required, Validators.minLength(2), Validators.maxLength(6000)]
      ],
      imageUrl: [this.exercise?.imageUrl,
      [
        Validators.pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i)
      ]
      ]
    });
  }

  async submitExercise() {
    const submittedExercise = this.form.getRawValue() as Exercise;
    submittedExercise.publishDate = this.exercise?.publishDate || Date.now();
    this.loggedUser.subscribe(u => submittedExercise.authorId = u.id);
    this.exercise = submittedExercise;
    if (submittedExercise.id!>0) {
      this.exerciseService.update(submittedExercise)
        .subscribe({
          next: ex => this.router.navigate([`exercises/${submittedExercise.id}`], { queryParams: { refresh: true } }),
        });
    } else {
      this.exerciseService.create(submittedExercise).subscribe({
        next: ex => this.router.navigate([`exercises/${submittedExercise.id}`], { queryParams: { refresh: true } }),
      });
    }

  }
}

