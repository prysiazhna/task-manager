import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private userService: UserService) {}

  canActivate: CanActivateFn = () => {
    const user = this.userService.getCurrentUser();
    if (user) {
      return true;
    }
    this.router.navigate(['account/login']);
    return false;
  };
}
