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
  userRole: string | null = null;
  userName: string | null = null; 
  isLogoutMenuOpen = false; 



  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
        this.userRole = user.role;
        this.userName = user.name;
        // Option 1 : Comparer en Majuscules
        if (this.userRole === 'ROLE_SUPER_ADMIN') {
            this.isSuperAdmin = true;
        }
        // Option 2 : Ignorer la Casse
        // if (this.userRole && this.userRole.toLowerCase() === 'role_super_admin') {
        //     this.isSuperAdmin = true;
        // }
        console.log('user:', user);
        console.log('userRole:', this.userRole);
        console.log('isSuperAdmin:', this.isSuperAdmin);
    }
}

  manageUsers(): void {
    console.log('Gérer les utilisateurs');
    this.router.navigate(['/manage-users']); // Redirigez vers la page de gestion des utilisateurs
  }

  manageRobots(): void {
    console.log('Gérer les robots');
    this.router.navigate(['/manage-robots']); 
  }

  viewRobots(): void {
    console.log('Voir les robots');
    this.router.navigate(['/robots']); 
  }
  toggleLogoutMenu(): void {
    this.isLogoutMenuOpen = !this.isLogoutMenuOpen;
}

logout(): void {
    this.authService.logout(); // Supposons que vous avez une méthode logout dans AuthService
    this.router.navigate(['/login']);
    this.isLogoutMenuOpen = false;
}

 
}
