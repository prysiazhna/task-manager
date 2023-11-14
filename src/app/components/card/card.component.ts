import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() public task: Task;

  constructor(private taskService: TaskService) {}

  public delete(): void {
    this.taskService.deleteTask(this.task);
  }
}
