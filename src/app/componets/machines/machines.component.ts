import { Component, OnInit } from '@angular/core';
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
  newMachine: Machine = new Machine('', 0, { id: 0, uid: '' });
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
  }

  getAllMachines(): void {
    this.machineService.getAllMachines().subscribe(
      (data: Machine[]) => this.machines = data,
      (error) => console.error('Erreur lors de la récupération des machines', error)
    );
  }

  getAllFrequencies(): void {
    this.frequencyService.getAllFrequencies().subscribe(
      (data: radioFrequency[]) => this.frequencies = data,
      (error) => console.error('Erreur lors de la récupération des fréquences', error)
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
      (error) => console.error('Erreur lors de l\'ajout de la machine', error)
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
    if (!this.isSuperAdmin()) {
      alert('Accès refusé. Seul le Super Admin peut modifier une machine.');
      return;
    }

    if (!this.selectedMachine || !this.selectedMachine.id) {
      console.error("Aucune machine sélectionnée ou ID invalide.");
      return;
    }

    const selectedFrequency = this.frequencies.find(freq => freq.id === this.selectedMachine.radioFrequencyId);
    if (selectedFrequency) {
      this.selectedMachine.radioFrequency = selectedFrequency;
    }

    this.machineService.updateMachine(this.selectedMachine.id, this.selectedMachine).subscribe(
      () => {
        this.getAllMachines();
        this.closeEditMachineModal();
      },
      (error) => {
        console.error("Erreur lors de la mise à jour de la machine :", error);
        alert("Une erreur est survenue lors de la mise à jour. Veuillez réessayer.");
      }
    );
  }

  deleteMachine(machineId: number): void {
    this.machines = this.machines.filter(machine => machine.id !== machineId);
  
    this.machineService.deleteMachine(machineId).subscribe(
      () => {
        console.log('Machine supprimée avec succès');
      },
      (error) => {
        console.error('Erreur lors de la suppression de la machine', error);
        this.getAllMachines(); 
      }
    );
  }
  

  searchMachines(): Machine[] {
    return this.machines.filter(machine => 
      machine.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  updateSelectedMachineFrequency(newFrequencyId: number): void {
    const selectedFrequency = this.frequencies.find(freq => freq.id === newFrequencyId);
    if (selectedFrequency) {
      this.selectedMachine.radioFrequency = { ...selectedFrequency };
    }
  }

  trackByMachineId(index: number, machine: Machine): number {
    return machine.id ?? index;
  }

  trackByFrequencyId(index: number, freq: radioFrequency): number {
    return freq.id;
  }
}
