import { Task } from '../../../models';
import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  constructor(private taskService: TaskService) {}

  public createTask(data: Task): void {
    this.taskService.addTask(data);
  }
}
