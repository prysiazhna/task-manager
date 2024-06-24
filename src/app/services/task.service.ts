import { Task } from '../models';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks = new BehaviorSubject<Task[] | null>(null);
  public tasks$ = this.tasks.asObservable();
  private userService: UserService;

  constructor(private injector: Injector) {}

  private getUserService(): UserService {
    if (!this.userService) {
      this.userService = this.injector.get(UserService);
    }
    return this.userService;
  }

  public getTasks(): Task[] {
    const user = this.getUserService().getCurrentUser();
    return user ? user.tasks : [];
  }

  public setTaskData(tasks: Task[] | null): void {
    if (tasks !== null) {
      this.getUserService().updateUserTasks(tasks);
      this.tasks.next(tasks);
    }
  }

  public getTask(title: string): Task | undefined {
    const tasks = this.getTasks();
    return tasks ? tasks.find((item: Task) => title === item.title) : undefined;
  }

  public addTask(task: Task): void {
    const tasks = this.getTasks() || [];
    this.setTaskData([...tasks, task]);
  }

  public deleteTask(task: Task): void {
    let tasks = this.getTasks();
    if (tasks) {
      tasks = tasks.filter((item: Task) => item.title !== task.title);
      this.setTaskData(tasks);
    }
  }

  public updateTask(oldTitle: string, newTask: Task): void {
    let tasks = this.getTasks();
    if (tasks) {
      const updatedTasks = tasks.map((item: Task) =>
        item.title === oldTitle ? { ...newTask } : item
      );
      this.setTaskData(updatedTasks);
    }
  }
}
