import { Routes } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';
import { ForgotPasswordComponent } from './componets/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './componets/change-password/change-password.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ChangePasswordComponent }, // Corrigez ici
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Rediriger vers la page de connexion par défaut
  { path: '**', redirectTo: '/login' }, // Route par défaut pour les chemins inconnus
];
