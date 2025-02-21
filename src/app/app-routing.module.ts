import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './componets/signup/signup.component'; 
import {  LoginComponent} from './componets/login/login.component'; 
import {ForgotPasswordComponent} from './componets/forgot-password/forgot-password.component'


const routes: Routes = [
  { path: '', component: LoginComponent },  // Page de connexion par défaut
  { path: 'forgot-password', component: ForgotPasswordComponent },  // Page mot de passe oublié

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot([]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {} 