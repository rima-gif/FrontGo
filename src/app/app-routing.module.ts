import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './componets/signup/signup.component'; 
import {  LoginComponent} from './componets/login/login.component'; 
import {ForgotPasswordComponent} from './componets/forgot-password/forgot-password.component'
import { FormsModule } from '@angular/forms';

import{ ChangePasswordComponent} from './componets/change-password/change-password.component'

import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: LoginComponent },  // Page de connexion par défaut
  { path: 'forgot-password', component: ForgotPasswordComponent },  // Page mot de passe oublié
  {path: 'signup',component: SignupComponent},
  {path: 'changePass',component: ChangePasswordComponent}

];

@NgModule({

  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot([]),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {} 