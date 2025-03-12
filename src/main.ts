import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


// ✅ Ajouter withFetch() dans appConfig en étendant ses providers
const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),  // Préserver les autres providers existants
    provideHttpClient(withFetch()), provideAnimationsAsync()   // ✅ Active fetch() pour HttpClient
  ]
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch((err) => console.error(err));
