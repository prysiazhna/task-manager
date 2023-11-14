import {TaskService} from 'src/app/services/task.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, EMPTY, empty} from 'rxjs';
import {User} from '../models';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({providedIn: 'root'})
export class UserService {
  private currentUser = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUser.asObservable();

  constructor(
    private router: Router,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
  ) {
  }

  public register(user: User): void {
    let users = JSON.parse(localStorage.getItem('users') as string) || [];
    localStorage.setItem('users', JSON.stringify([...users, user]));
  }

  public setUserData(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.next(user);
  }

  public getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('user') as string);
  }

  public login(user: User): void {
    let users = JSON.parse(localStorage.getItem('users') as string);
    const currentUser = users.find(
      (item: User) =>
        user.username === item.username && user.password === item.password,
    );

    if (currentUser) {
      this.setUserData(currentUser);
      this.router.navigate(['/home']);
    } else {
      this.snackBar.open('Username or password is incorrect', 'Close', {
        duration: 3000,
      });
    }
  }

  public logout(): void {
    this.taskService.setTaskData(null);
    localStorage.removeItem('user');
    this.currentUser.next(null as any);
    this.router.navigate(['/login']);
  }
}
