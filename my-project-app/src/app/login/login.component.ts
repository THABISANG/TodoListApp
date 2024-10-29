import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login = {
    email: '',
    password: '',
  };
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  onLogin() {
    console.log(this.login);
    const { email,password } = this.login;
    this.authService.getUserDetails(email , password).subscribe({
      next: response => {
        if(response.length>=1){
          sessionStorage.setItem('emai',email);
          this.router.navigate(['home']);
        }else{
          this.messageService.add({
            severity:'error',
            summary:'error',
            detail:'Something went wrong',
          });
        }
      }, error:()=>{
        this.messageService.add({

        })
      }
    })

  }
}
