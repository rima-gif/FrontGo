import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup;
  message: string = ''; // Pour afficher le message de confirmation
  messageType: 'success' | 'error' | '' = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.forgetPasswordForm.get('email');
  }

  onSubmit() {
    
    if (this.forgetPasswordForm.valid) {
      const email = this.forgetPasswordForm.value.email;
      
      this.http.post('http://localhost:8080/auth/forgot-password', { email }).subscribe({
        next: () => {
          this.message = '✅ Un email de réinitialisation a été envoyé avec succès.';
          this.messageType = 'success';
          setTimeout(() => this.message = '', 5000);
        },
        error: () => {
          this.message = '❌ Une erreur s’est produite. Veuillez réessayer.';
          this.messageType = 'error';
          setTimeout(() => this.message = '', 5000);
        }
      });

      console.log('Formulaire envoyé avec:', this.forgetPasswordForm.value);
    }
  }
}
