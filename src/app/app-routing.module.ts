import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './componets/signup/signup.component'; 
import {  LoginComponent} from './componets/login/login.component'; 


const routes: Routes = [
  { path: 'signup', component:SignupComponent},
  { path: 'login', component: LoginComponent },
 // { path: 'forgot', component: ForgetPasswordComponent },
  //{ path: 'changepassword', component: ResetPasswordComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' }, // Redirection par défaut

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}