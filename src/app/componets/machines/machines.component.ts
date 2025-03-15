import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Machine } from '../../models/machine.model';
import { radioFrequency } from '../../models/RadioFrequency.model';
import { MachineService } from '../../services/machine.service';
import { RadioFrequencyService } from '../../services/radio-frequency.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {
  machines: Machine[] = [];
  frequencies: radioFrequency[] = [];
  newMachine: Machine = new Machine('', 0, { id: 0, uid: '' });  // Initialisation de newMachine
  selectedMachine: Machine = new Machine('', 0, { id: 0, uid: '' });
  showAddMachineModal: boolean = false;
  showEditMachineModal: boolean = false;
  searchQuery: string = '';

  constructor(
    private machineService: MachineService,
    private frequencyService: RadioFrequencyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllMachines();
    this.getAllFrequencies();
    this.selectedMachine = new Machine('Machine 1', 1, { id: 1, uid: 'uid-001' });

  }

  getAllMachines(): void {
    this.machineService.getAllMachines().subscribe(
      (data: Machine[]) => { this.machines = data; },
      (error) => { console.error('Erreur lors de la récupération des machines', error); }
    );
  }

  getAllFrequencies(): void {
    this.frequencyService.getAllFrequencies().subscribe(
      (data: radioFrequency[]) => { this.frequencies = data; },
      (error) => { console.error('Erreur lors de la récupération des fréquences', error); }
    );
  }

  isSuperAdmin(): boolean {
    return this.authService.isSuperAdmin();
  }

  openAddMachineModal(): void {
    if (!this.isSuperAdmin()) {
      alert('Accès refusé. Seul le Super Admin peut ajouter une machine.');
      return;
    }
    this.newMachine = new Machine('', 0, { id: 0, uid: '' });
    this.showAddMachineModal = true;
  }

  closeAddMachineModal(): void {
    this.showAddMachineModal = false;
  }

  saveMachine(): void {
    if (!this.isSuperAdmin()) {
      alert('Accès refusé. Seul le Super Admin peut ajouter une machine.');
      return;
    }
    this.machineService.addMachine(this.newMachine).subscribe(
      () => {
        this.getAllMachines();
        this.closeAddMachineModal();
      },
      (error) => { console.error('Erreur lors de l\'ajout de la machine', error); }
    );
  }

  openEditMachineModal(machine: Machine): void {
    if (!this.isSuperAdmin()) {
      alert('Accès refusé. Seul le Super Admin peut modifier une machine.');
      return;
    }
    this.selectedMachine = { ...machine };
    this.showEditMachineModal = true;
  }

  closeEditMachineModal(): void {
    this.showEditMachineModal = false;
  }

  saveEditedMachine(): void {
    if (!this.isSuperAdmin() || !this.selectedMachine) {
      alert('Accès refusé. Seul le Super Admin peut modifier une machine.');
      return;
    }

    this.machineService.updateMachine(this.selectedMachine.id!, this.selectedMachine).subscribe(
      () => {
        this.getAllMachines();
        this.closeEditMachineModal();
      },
      (error) => { console.error('Erreur lors de la mise à jour de la machine', error); }
    );
  }

  deleteMachine(machineId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette machine ?')) {
      this.machineService.deleteMachine(machineId).subscribe(
        () => { this.getAllMachines(); },
        (error) => { console.error('Erreur lors de la suppression de la machine', error); }
      );
    }
  }

  searchMachines(): Machine[] {
    return this.machines.filter(machine =>
      machine.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
