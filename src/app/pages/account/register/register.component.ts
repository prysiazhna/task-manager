import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public form: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {}

  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
  public onSubmit(): void {
    this.userService.register(this.form.value);
    this.router.navigate(['account/login']);
  }
}
