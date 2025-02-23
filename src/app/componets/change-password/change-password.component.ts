import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

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
    if (this.isFormValid()) {
      // Simuler un changement de mot de passe réussi
      alert('Mot de passe changé avec succès !');
      // Rediriger vers la page de connexion
      this.router.navigate(['/login']);
    } else {
      alert('Veuillez vérifier les champs du formulaire.');
    }
  }


}
