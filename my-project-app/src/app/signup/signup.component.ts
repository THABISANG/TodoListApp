import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../services/auth.service';
import { signupPostData } from '../interfaces/auth';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, InputTextModule, PasswordModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] 
})
export class SignupComponent {
  private messageService =inject(MessageService);
  private signupService = inject(AuthService);
  private router = inject(Router);
  signupForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
    ]),
    password: new FormControl('', [Validators.required]),
    confirmpassword: new FormControl('', [Validators.required]) 
  });
  onSignup(){
    const postData ={...this.signupForm.value}
    delete postData.confirmpassword;
    this.signupService.signupUser(postData as signupPostData).subscribe( 
      {
        next: (response) => {
          this.messageService.add({
            severity:'success',
            summary:'success',
            detail:'Signed up successfully',
          })
          this.router.navigate(['login']);
          console.log(response);
        },
        error: (err) => {
          this.messageService.add({
            severity:'error',
            summary:'error',
            detail:'Failed to signup',
          })
          console.log(err);
        }
      });
    return this.signupForm.controls
  }
}
