import {Task} from '../../models';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from 'src/app/services/task.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  public tasks: Task[] = [];
  public destroy$ = new Subject<void>();

  constructor(private taskService: TaskService) {
  }

  public ngOnInit(): void {
    this.getTasks();
  }

  public getTasks(): void {
    this.taskService.tasks$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.tasks = !data ? this.taskService.getTasks() : data;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
