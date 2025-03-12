import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
import { MatIconModule } from '@angular/material/icon'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { RouterModule, Router } from '@angular/router'; 
import { AuthService } from '../../services/auth.service'; // Importez AuthService

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true, 
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule 
  ]
})
export class DashboardComponent implements OnInit {
  user: any; 
  isSuperAdmin: boolean = false; 

  constructor(private authService: AuthService, private router: Router) { } 

  ngOnInit(): void {
    this.user = this.authService.getUser();

    if (this.user && this.user.role) {
      this.isSuperAdmin = this.user.role.includes('ROLE_SUPER_ADMIN');
    }

    // Afficher les informations de l'utilisateur dans la console pour vérification
    console.log('Utilisateur connecté :', this.user);
    console.log('Est Super Admin :', this.isSuperAdmin);
  }

  // Méthode pour gérer les utilisateurs (Super Admin seulement)
  manageUsers(): void {
    console.log('Gérer les utilisateurs');
    this.router.navigate(['/manage-users']); // Redirigez vers la page de gestion des utilisateurs
  }

  // Méthode pour gérer les robots (Super Admin seulement)
  manageRobots(): void {
    console.log('Gérer les robots');
    this.router.navigate(['/manage-robots']); // Redirigez vers la page de gestion des robots
  }

  // Méthode pour voir les robots (Utilisateurs normaux)
  viewRobots(): void {
    console.log('Voir les robots');
    this.router.navigate(['/robots']); // Redirigez vers la page des robots
  }
}