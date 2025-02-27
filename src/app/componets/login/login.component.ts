import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec les validations
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signin(): void {
    // Vérifiez si le formulaire est invalide
    if (this.loginForm.invalid) {
      this.showNotification('Veuillez remplir tous les champs.', 'error-snackbar');
      return;
    }

    // Appel au service d'authentification
    this.authService.signin(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (response) => {
        console.log(response); // Ajout d'un log pour vérifier la réponse
        if (response.status === 'success') {
          this.showNotification('✅ Connexion réussie 🎉', 'success-snackbar');
        } else {
          this.showNotification('❌ Email ou mot de passe invalide.', 'error-snackbar');
        }
      },
      error: () => {
        this.showNotification('❌ Une erreur est survenue. Veuillez réessayer.', 'error-snackbar');
      }
    });
  }
//partie notification 
  private showNotification(message: string, panelClass: string): void {
 
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [panelClass]
    });
  }
}
