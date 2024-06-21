import { Task } from '../../models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  @Input() public pageTitle: string;
  @Input() public task: Task;
  @Output() submit = new EventEmitter();

  public form: FormGroup = this.fb.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ],
    ],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    dueDate: ['', Validators.required],
    dueTime: ['', Validators.required],
    status: ['', Validators.required],
    priority: ['', Validators.required],
  });

  public statuses: string[] = ['New', 'In Progress', 'Closed'];

  constructor(private fb: FormBuilder, private router: Router) {}

  public ngOnInit(): void {
    if (this.task) {
      this.form.patchValue(this.task);
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  public onSubmit(): void {
    this.submit.emit({ ...this.form.value });
    this.router.navigate(['/list']);
  }
}
