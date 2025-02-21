import { Routes } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';
import { ForgotPasswordComponent } from './componets/forgot-password/forgot-password.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component:ForgotPasswordComponent},  // Page mot de passe oublié
  { path: '**', redirectTo: 'login' } , // Redirection vers login si la route n'existe pas


];