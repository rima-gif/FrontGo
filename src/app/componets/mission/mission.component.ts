import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.css'
})
export class MissionComponent implements OnInit {

  missions =[
    { nom: 'Mission 1', status: 'connected' },
    { nom: 'Mission 2', status: 'disconnected' },
    { nom: 'Mission 3', status: 'connected' }
  ];
  
  isModalOpen = false;
  modalTitle = 'Ajouter une Mission';
  missionForm = { nom: '', status: 'connected' };

  constructor() {}

  ngOnInit(): void {}

  // Ouvre la modale pour ajouter une nouvelle mission
  openModal(): void {
    this.isModalOpen = true;
    this.modalTitle = 'Ajouter une Mission';
    this.missionForm = { nom: '', status: 'connected' };
  }

  // Ferme la modale
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Sauvegarde une mission
  saveMission(): void {
    if (this.missionForm.nom.trim()) {
      // Si une mission est en cours d'édition, on la met à jour
      const existingMissionIndex = this.missions.findIndex(m => m.nom === this.missionForm.nom);
      if (existingMissionIndex >= 0) {
        this.missions[existingMissionIndex] = { ...this.missionForm };
      } else {
        // Sinon, on ajoute une nouvelle mission
        this.missions.push({ ...this.missionForm });
      }
      this.closeModal();
    }
  }

  // Édite une mission existante
  editMission(mission: any): void {
    this.isModalOpen = true;
    this.modalTitle = 'Modifier la Mission';
    this.missionForm = { ...mission };
  }

  // Supprime une mission
  deleteMission(mission: any): void {
    const index = this.missions.indexOf(mission);
    if (index >= 0) {
      this.missions.splice(index, 1);
    }
  }
}
