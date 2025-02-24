import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importez Router au lieu de RouterLink
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Assurez-vous que c'est "styleUrls" et non "styleUrl"
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {} // Changez RouterLink en Router

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = "Veuillez remplir tous les champs.";
      return;
    }
    this.authService.signin(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Connexion réussie', response);

        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('username', response.name);
        localStorage.setItem('role', response.role);

        this.router.navigate(['/dashbord']); // Utilisez Router pour naviguer
      },
      error: (error) => {
        console.error('Erreur de connexion:', error);
        this.errorMessage = "Email ou mot de passe incorrect.";
      }
    });
  }
}
