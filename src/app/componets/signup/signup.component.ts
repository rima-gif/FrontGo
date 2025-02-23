import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { response } from 'express';
import { error } from 'console';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ RouterLink,
    CommonModule,        // Pour *ngIf, *ngFor, etc.
    ReactiveFormsModule

  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  signupForm! : FormGroup;
  successMessage: string ='';
  errorMessage: string ='';
  constructor(private fb:FormBuilder,private authService:AuthService){}
  ngOnInit(): void {
      this.signupForm = this.fb.group({
        username:['',[Validators.required]],
        email:['',[Validators.required]],
        password:['',[Validators.required,Validators.minLength(6)]],
      });
  }
  
onSubmit(): void{
  if(this.signupForm.valid){
    this.authService.signup(this.signupForm.value).subscribe({
      next:(response)=>{
        this.successMessage = '✅ Utilisateur ajouté avec succès !';
        this.errorMessage = '';
        this.signupForm.reset(); // Réinitialiser le formulaire après succès
      },
      error:(err)=>{
        this.errorMessage = '❌ Une erreur est survenue. Veuillez réessayer.';
        this.successMessage = '';
      },
      
    })
  }
}
}
