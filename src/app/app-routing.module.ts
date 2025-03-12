import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './componets/signup/signup.component';
import { LoginComponent } from './componets/login/login.component';
import { ForgotPasswordComponent } from './componets/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './componets/change-password/change-password.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import{RobotsComponent} from './componets/robots/robots.component';
import{AuthGuard} from './services/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ChangePasswordComponent },
  { path: 'robots', component: RobotsComponent,canActivate: [AuthGuard] },
  // Redirection par défaut
  { path: '**', redirectTo: '/login' } // Gérer les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
