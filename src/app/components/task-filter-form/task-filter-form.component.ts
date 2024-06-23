import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskPriority, TaskStatus } from '../../helpers/app.config';

@Component({
  selector: 'app-task-filter-form',
  templateUrl: './task-filter-form.component.html',
  styleUrls: ['./task-filter-form.component.scss']
})
export class TaskFilterFormComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<Record<string, any>>();
  public filterForm: FormGroup;
  public statusList = Object.values(TaskStatus);
  public priorityList = Object.values(TaskPriority);

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group(this.getInitFilter());
  }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(values => {
      this.filterChanged.emit(values);
    });
  }

  public resetFilters(): void {
    this.filterForm.reset({
      title: '',
      dueDateStart: null,
      dueDateEnd: null,
      status: '',
      priority: ''
    });
  }

  public getInitFilter(){
    return {
      title: [''],
      dueDateStart: [null],
      dueDateEnd: [null],
      status: [''],
      priority: ['']
    }
  }
}
