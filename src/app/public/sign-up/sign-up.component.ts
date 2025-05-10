import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
              private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordAgain: new FormControl('', [Validators.required])
    },{
      validators: passwordMatchValidator('password', 'passwordAgain')
    });

    this.loadItems();
  }

  loadItems() {
    this.http.get<any[]>('http://localhost:3000/vehicles').subscribe(data => {
      console.log(data);
    });
  }

  public onClickLogin() {
    this.router.navigateByUrl("/login");
  }

  
}
