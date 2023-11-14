import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(): boolean {
    const user = this.userService.getCurrentUser();
    if (user) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
