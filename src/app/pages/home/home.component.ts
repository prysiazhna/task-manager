import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public currentUser: User;

  constructor
  (private router: Router,
   private userService: UserService,
   private taskService: TaskService) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  navigateToCreateTask(): void {
    this.router.navigate(['/list']);
  }
}
