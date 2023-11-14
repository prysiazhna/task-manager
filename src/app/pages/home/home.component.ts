import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public currentUser: User;
  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }
}
