import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { ForgotPasswordComponent } from "./componets/forgot-password/forgot-password.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ForgotPasswordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontSmart17';
}
