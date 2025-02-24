import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.successMessage = `✅ ${response.message}`;
            this.errorMessage = '';
            this.signupForm.reset();
          } else {
            this.errorMessage = `❌ ${response.message}`;
            this.successMessage = '';
          }
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.errorMessage = `❌ ${err.error.message}`;
          } else {
            this.errorMessage = '❌ Une erreur est survenue. Veuillez réessayer.';
          }
          this.successMessage = '';
        }
      });
    }
  }
}