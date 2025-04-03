import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './componets/signup/signup.component';
import { LoginComponent } from './componets/login/login.component';
import { ForgotPasswordComponent } from './componets/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './componets/change-password/change-password.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import{RobotsComponent} from './componets/robots/robots.component';
import{RFidComponent} from './componets/rfid/rfid.component';
import{MachinesComponent} from './componets/machines/machines.component';
import{MissionComponent} from './componets/mission/mission.component'
import{AuthGuard} from './services/auth.guard';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'reset-password', component: ChangePasswordComponent },
  { path: 'robots', component: RobotsComponent,canActivate: [AuthGuard] },
  {path :'locations',component:RFidComponent,canActivate:[AuthGuard]},
  {path:'machines',component:MachinesComponent,canActivate:[AuthGuard]},
  {path:'missions',component:MissionComponent,canActivate:[AuthGuard]},

  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
