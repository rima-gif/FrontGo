import { Routes } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';
import { ForgotPasswordComponent } from './componets/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './componets/change-password/change-password.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component:ForgotPasswordComponent},
  {path: 'changePass', component:ChangePasswordComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login on app start
  { path: '**', redirectTo: '/login' }, // Wildcard route for unknown paths  // Page mot de passe oublié
 

];