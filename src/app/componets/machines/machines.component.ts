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
  newMachine: any = {
    name: '',
    radioFrequency: { id: 0 },
    processed: false
  };
  selectedMachine: any = {
    name: '',
    radioFrequency: { id: 0 },
    processed: false
  };
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
      (data: radioFrequency[]) => {
        this.frequencies = data;
        console.log('Fréquences récupérées:', this.frequencies);
      },
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
    this.newMachine = {
      name: '',
      radioFrequency: { id: 0 },
      processed: false
    };
    this.showAddMachineModal = true;
  }

  closeAddMachineModal(): void {
    this.showAddMachineModal = false;
  }

  saveMachine(): void {
    if (!this.isSuperAdmin()) return;
  
    if (!this.newMachine.radioFrequency?.id) {
      alert("Sélectionnez une fréquence valide");
      return;
    }
  
    const payload = {
      name: this.newMachine.name,
      radioFrequency: {
        id: this.newMachine.radioFrequency.id
      },
      processed: false
    };
  
    console.log('Envoi au backend:', payload); // Debug
  
    this.machineService.addMachine(payload).subscribe({
      next: () => {
        this.getAllMachines();
        this.closeAddMachineModal();
      },
      error: (err) => {
        console.error('Erreur:', err);
        alert(err.error?.message || "Erreur serveur");
      }
    });
  }

  openEditMachineModal(machine: Machine): void {
    if (!this.isSuperAdmin()) {
      alert('Accès refusé');
      return;
    }
  
    // Clonage profond avec conversion des types
    this.selectedMachine = {
      ...machine,
      radioFrequency: {
        id: Number(machine.radioFrequency.id),
        uid: machine.radioFrequency.uid
      }
    };
  
    console.log('Machine sélectionnée pour édition:', this.selectedMachine);
    this.showEditMachineModal = true;
  }

  closeEditMachineModal(): void {
    this.showEditMachineModal = false;
  }

  saveEditedMachine(): void {
    if (!this.isSuperAdmin()) {
      alert('Accès refusé');
      return;
    }
  
    if (!this.selectedMachine?.id) {
      console.error("Machine invalide");
      return;
    }
  
    // Debug approfondi
    console.log('ID fréquence recherché:', this.selectedMachine.radioFrequency.id);
    console.log('Type de l\'ID:', typeof this.selectedMachine.radioFrequency.id);
    console.log('Fréquences disponibles:', this.frequencies);
  
    // Recherche avec conversion explicite des types
    const selectedFrequency = this.frequencies.find(freq => 
      Number(freq.id) === Number(this.selectedMachine.radioFrequency.id)
    );
  
    if (!selectedFrequency) {
      console.error('Détails de la fréquence non trouvée:', {
        searchedId: this.selectedMachine.radioFrequency.id,
        availableIds: this.frequencies.map(f => f.id)
      });
      alert(`Fréquence ID ${this.selectedMachine.radioFrequency.id} non trouvée dans la liste locale`);
      return;
    }
  
    // Construction du payload
    const updatePayload = {
      name: this.selectedMachine.name,
      radioFrequencyId: selectedFrequency.id
    };
  
    console.log('Payload final:', updatePayload);
  
    this.machineService.updateMachine(this.selectedMachine.id, updatePayload).subscribe({
      next: () => {
        this.getAllMachines();
        this.closeEditMachineModal();
        alert('Mise à jour réussie!');
      },
      error: (err) => {
        console.error('Erreur complète:', err);
        alert(err.error?.message || 'Erreur lors de la mise à jour');
      }
    });
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
