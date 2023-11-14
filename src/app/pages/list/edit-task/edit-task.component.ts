import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  public task: Task | null;

  constructor(private taskService: TaskService, public route: ActivatedRoute) {}

  public ngOnInit(): void {
    const title = this.route.snapshot.paramMap.get('id');
    this.task = title? this.taskService.getTask(title): null;
  }

  public editTask(updatedTask: Task): void {
    if(this.task?.title) {
      this.taskService.updateTask(this.task.title, updatedTask);
    }  }
}
