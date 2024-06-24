import { Task } from '../models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {getFromLocalStorage, setToLocalStorage} from "./local-storage.service";

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks = new BehaviorSubject<Task[] | null>(null);

  public tasks$ = this.tasks.asObservable();

  constructor() {}

  public getTasks(): Task[] {
    return getFromLocalStorage('tasks');
  }

  public setTaskData(tasks: Task[] | null): void {
    setToLocalStorage('tasks', tasks);
    this.tasks.next(tasks);
  }

  public getTask(title: string): Task | undefined {
    const tasks = getFromLocalStorage('tasks');
    return tasks ? tasks.find((item: Task) => title === item.title) : undefined;
  }

  public addTask(task: Task): void {
    const tasks = getFromLocalStorage('tasks') || [];
    this.setTaskData([...tasks, task]);
  }

  public deleteTask(task: Task): void {
    let tasks = getFromLocalStorage('tasks');
    if (tasks) {
      tasks = tasks.filter((item: Task) => item.title !== task.title);
      this.setTaskData(tasks);
    }
  }

  public updateTask(oldTitle: string, newTask: Task): void {
    let tasks = getFromLocalStorage('tasks');
    if (tasks) {
      const updatedTasks = tasks.map((item: Task) =>
        item.title === oldTitle ? { ...newTask } : item
      );
      this.setTaskData(updatedTasks);
    }
  }
}
