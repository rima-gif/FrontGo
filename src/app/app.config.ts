import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ForgotPasswordComponent } from './componets/forgot-password/forgot-password.component';
import { LoginComponent } from './componets/login/login.component';

const routes = [
  { path: 'forgot-password', component: ForgotPasswordComponent }, // Définissez la route
  { path: 'login', component: LoginComponent }, // Définissez la route de connexion
  // autres routes
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(),
    provideHttpClient() // Ajout du HttpClient

  ]
};
