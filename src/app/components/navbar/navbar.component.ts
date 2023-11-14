import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private userService: UserService) {}

  public logout(): void {
    this.userService.logout();
  }
}
