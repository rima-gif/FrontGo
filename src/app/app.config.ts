import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Définition des routes
const appRoutes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./componets/login/login.component').then(m => m.LoginComponent) },
  { path: 'forgot-password', loadComponent: () => import('./componets/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
  { path: 'signup', loadComponent: () => import('./componets/signup/signup.component').then(m => m.SignupComponent) },
  { path: 'reset-password', loadComponent: () => import('./componets/change-password/change-password.component').then(m => m.ChangePasswordComponent) },
  { path: 'dashboard', loadComponent: () => import('./componets/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  {path :'robots',loadComponent:()=>import('./componets/robots/robots.component').then(m=>m.RobotsComponent)},
  {path:'locations',loadComponent:()=>import('./componets/rfid/rfid.component').then(m=>m.RFidComponent)},
  {path:'machines',loadComponent:()=>import('./componets/machines/machines.component').then(m=>m.MachinesComponent)}
  // { path: '**', redirectTo: 'login' } // Redirige vers login si la route n'existe pas
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes), // Utilisation correcte des routes
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ]
};
