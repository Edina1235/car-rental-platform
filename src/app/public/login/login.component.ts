import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  constructor() {
    if(localStorage.getItem('user_id'))
      this.router.navigateByUrl('/car-rental-platform');
  }

  public onClickLogin() {
    const user = {
      username: this.email ?? '',
      password: this.password ?? ''
    }

    this.authService.login(user).subscribe({
       next: (data) => {
          this.userService.user = data as User;
          localStorage.setItem('user_id', this.userService.user?._id ?? '');
          this.router.navigateByUrl("/car-rental-platform");
        }, error: (err) => {
          console.log(err);
        }
      });
  }

  public onClickSignUp() {
    this.router.navigateByUrl("/sign-up");
  }

  private get email() {
    return this.loginForm.get('email')?.value;
  }

  private get password() {
    return this.loginForm.get('password')?.value;
  }
}
