import { Task } from './../models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks = new BehaviorSubject<Task[] | null>(null);

  public tasks$ = this.tasks.asObservable();

  constructor() {}

  public getTasks(): Task[] {
    return JSON.parse(localStorage.getItem('tasks') as string);
  }
  public setTaskData(tasks: Task[] | null): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasks.next(tasks);
  }

  public getTask(title: string): Task {
    let tasks = JSON.parse(localStorage.getItem('tasks') as string);
    return tasks.find((item: Task) => title === item.title);
  }

  public addTask(task: Task): void {
    let tasks = JSON.parse(localStorage.getItem('tasks') as string) || [];
    this.setTaskData([...tasks, task]);
  }

  public deleteTask(task: Task): void {
    let tasks = JSON.parse(localStorage.getItem('tasks') as string);
    tasks.forEach((item: Task, index: number) => {
      if (item.title === task.title) {
        tasks.splice(index, 1);
      }
    });
    this.setTaskData(tasks);
  }

  public updateTask(oldTitle: string, newTask: Task): void {
    let tasks = JSON.parse(localStorage.getItem('tasks') as string);
    let updatedTasks = tasks.map((item: Task) => {
      return item.title === oldTitle ? (item = { ...newTask }) : item;
    });
    this.setTaskData(updatedTasks);
  }
}
