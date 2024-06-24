import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Task} from 'src/app/models/task';
import {TaskPriority, TaskStatus} from "../../helpers/app.config";

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
  public priorityList = Object.values(TaskPriority);
  public statuses: string[] = Object.values(TaskStatus);

  public form: FormGroup = this.fb.group(this.getFormInit());

  constructor(private fb: FormBuilder, private router: Router) {
  }

  public ngOnInit(): void {
    this.patchValue();
  }

  public patchValue(): void {
    if (this.task) {
      this.form.patchValue({
        ...this.task,
        dueDate: new Date(this.task.dueDate),
      });
    }
  };

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  public getFormInit(){
   return  {
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
      status: ['', Validators.required],
      priority: ['', Validators.required],
    }
  }

  public onSubmit(): void {
    const task = {
      ...this.form.value,
      dueDate:this.form.value.dueDate,
    };
    this.submit.emit(task);
    this.router.navigate(['/list']);
  }
}
