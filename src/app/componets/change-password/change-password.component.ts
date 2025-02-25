import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http'; // Importez HttpClient

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'] // Corrigez 'styleUrl' en 'styleUrls'
})
export class ChangePasswordComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient // Ajoutez HttpClient au constructeur
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        alert("Token manquant ou invalide !");
        // Retirez la redirection vers la page de connexion
        return; // Sortir de la fonction si le token est invalide
      }
    });
  }

  // Vérifie si le formulaire est valide
  isFormValid(): boolean {
    return (
      this.newPassword.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.newPassword === this.confirmPassword
    );
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (!this.isFormValid()) {
      alert('Les nouveaux mots de passe ne correspondent pas.');
      return; // Sortie de la fonction si les mots de passe ne correspondent pas
    }
  
    this.authService.resetPassword(this.token, this.newPassword, this.confirmPassword)
      .subscribe(() => {
        alert('Votre mot de passe a été changé. Vous pouvez aller à la page de connexion.');
        this.router.navigate(['/login']);
      }, error => {
        console.error('Erreur lors de la réinitialisation du mot de passe', error);
        alert('Erreur lors de la réinitialisation du mot de passe : ' + error.error.error);
      });
  }
  
}
