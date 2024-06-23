import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Task} from 'src/app/models/task';
import {format, isBefore} from "date-fns";
import {combineDateAndTime} from "../../helpers/date-time-format.helper";
import {customTheme, TaskPriority} from "../../helpers/app.config";
import {validateTime} from "../../services/validators.service";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  @Input() public pageTitle: string;
  @Input() public task: Task;
  @Output() submit = new EventEmitter();
  public minDate: Date = new Date();
  public customTheme = customTheme;
  public priorityList = Object.values(TaskPriority);
  public form: FormGroup = this.fb.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ],
    ],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    dueDate: ['', Validators.required],
    dueTime: ['', Validators.required],
    status: ['', Validators.required],
    priority: ['', Validators.required],
  });

  public statuses: string[] = ['New', 'In Progress', 'Closed'];

  constructor(private fb: FormBuilder, private router: Router) {
  }

  public ngOnInit(): void {
    this.patchValue();
    this.form.controls['dueTime'].setValidators([
      Validators.required,
      validateTime.bind(this)
    ]);

    this.form.get('dueDate')?.valueChanges.subscribe(() => {
      this.form.get('dueTime')?.updateValueAndValidity();
    });
  }

  public patchValue(): void {
    if (this.task) {
      const dueDateTime = this.task.dueDateTime;

      this.form.patchValue({
        ...this.task,
        dueDate: dueDateTime ? format(new Date(dueDateTime).toUTCString(), 'yyyy-MM-dd') : '',
        dueTime: dueDateTime ? format(new Date(dueDateTime), 'hh:mm a') : '',
      });

      if (isBefore(new Date(dueDateTime), new Date())) {
        this.form.controls['dueTime'].setErrors({ invalidTime: true });
        this.form.markAllAsTouched();
        return;
      }
    }
  };

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  public onSubmit(): void {

    const dueDateTime = combineDateAndTime(this.form.value.dueDate, this.form.value.dueTime);
    const task = {
      ...this.form.value,
      dueDateTime,
    };

    delete task.dueDate;
    delete task.dueTime;

    this.submit.emit(task);
    this.router.navigate(['/list']);
  }
}
