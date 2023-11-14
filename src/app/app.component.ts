import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from './models';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public currentUser: User;
  public destroy$ = new Subject<null>();

  constructor(public userService: UserService) {}

  public ngOnInit(): void {
    this.userService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.currentUser = !data ? this.userService.getCurrentUser() : data;
      });
  }
  public ngOnDestroy(): void {
    this.destroy$.next(null as any);
    this.destroy$.complete();
  }
}
