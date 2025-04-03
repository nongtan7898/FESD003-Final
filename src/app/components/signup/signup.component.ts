import { UserService } from './../../service/user.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { User } from '../../classes/user';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user: User = new User();
  userService: UserService = inject(UserService)

  myform: FormGroup;
  constructor() {
    this.myform = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      userFirstName: new FormControl('', [Validators.required]),
      userLastName: new FormControl('', [Validators.required]),
      userTel: new FormControl('', [Validators.required])
    });
  }
  alert201 = false
  alert500 = false
  alert422 = false
  alert400 = false
  alert400_2 = false

  get userEmail() {
    return this.myform.get('userEmail');
  }

  get userPassword() {
    return this.myform.get('userPassword');
  }

  get userFirstName() {
    return this.myform.get('userFirstName');
  }

  get userLastName() {
    return this.myform.get('userLastName');
  }

  get userTel() {
    return this.myform.get('userTel');
  }

  onSubmit() {
    this.user = this.myform.value;
    this.userService.postSignup(this.user!).subscribe({
      next: (res) => {
        if (res.Result) {
          this.alert201 = true;
        } else {
          this.alert400_2 = true;
        }
      },
      error: (error) => {
        if (error.status == 400) {
          this.alert400 = true;
        } else if (error.status == 422) {
          this.alert422 = true;
        } else if (error.status == 500) {
          this.alert500 = true;
        }
        console.error(error);
      }
    })

    setTimeout(() => {
      this.alert201 = false
      this.alert500 = false
      this.alert422 = false
      this.alert400 = false
      this.alert400_2 = false
    }, 3000)
  }
}
