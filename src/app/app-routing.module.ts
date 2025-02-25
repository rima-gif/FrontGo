import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './componets/signup/signup.component'; 
import { LoginComponent } from './componets/login/login.component'; 
import { ForgotPasswordComponent } from './componets/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './componets/change-password/change-password.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Page de connexion par défaut
  { path: 'forgot-password', component: ForgotPasswordComponent },  // Page mot de passe oublié
  { path: 'signup', component: SignupComponent },
  { path: 'reset-password'  , component: ChangePasswordComponent } // Corrigé ici pour correspondre à app.routes.ts
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
