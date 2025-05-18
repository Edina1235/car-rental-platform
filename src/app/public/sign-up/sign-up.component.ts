import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role, User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';

export function passwordMatchValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value;
    const confirmPassword = group.get(confirmPasswordKey)?.value;
    
    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm!: FormGroup;
  public reservedEmailOrUsername: boolean = false;
    
  constructor(private router: Router,
    private authService: AuthService
  ) {
    if(localStorage.getItem('user_id'))
      router.navigateByUrl('/car-rental-platform');
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordAgain: new FormControl('', [Validators.required])
    },{
      validators: passwordMatchValidator('password', 'passwordAgain')
    });
  }

  public onClickSignUp() {
    const user: User = {
      name: this.username,
      email: this.email,
      passwordHash: this.password,
      createdAt: String(new Date()),
      role: Role.User
    }

    this.authService.register(user).subscribe({
        next: (data) => {
          console.log(data);
          this.onClickLogin();
        }, error: (err) => {
          console.log(err);
        }
      });
  }

  public onClickLogin() {
    this.router.navigateByUrl("/login");
  }

  public get username() {
    return this.signUpForm.get('username')?.value;
  }

  public get email() {
    return this.signUpForm.get('email')?.value;
  }

  public get password() {
    return this.signUpForm.get('password')?.value;
  }
}
