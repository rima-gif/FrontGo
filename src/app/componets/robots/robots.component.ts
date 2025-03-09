import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgFor,NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importez FormsModule pour utiliser ngModel

interface Robot {
  name: string;
  isConnected: boolean;
}

@Component({
  selector: 'app-robots',
  standalone: true,
  imports: [NgFor, MatIconModule, FormsModule,NgIf], // Ajoutez FormsModule ici
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.css']
})
export class RobotsComponent implements OnInit {
  robots: Robot[] = [
    { name: 'Robot-001', isConnected: true },
    { name: 'Robot-002', isConnected: false },
    { name: 'Robot-003', isConnected: true }
  ];

  showAddRobotModal: boolean = false;
  newRobot: Robot = { name: '', isConnected: true };

  ngOnInit(): void {}

  openAddRobotModal(): void {
    this.showAddRobotModal = true;
  }

  closeAddRobotModal(): void {
    this.showAddRobotModal = false;
    this.newRobot = { name: '', isConnected: true }; // Réinitialiser le formulaire
  }

  saveRobot(): void {
    if (this.newRobot.name) {
      this.robots.push({ ...this.newRobot });
      this.closeAddRobotModal(); // Fermer la modale après l'ajout
    }
  }

  editRobot(index: number): void {
    console.log('Modifier le robot à l\'index', index);
  }

  deleteRobot(index: number): void {
    this.robots.splice(index, 1);
  }

  searchTable(): void {
    const input = document.getElementById('myInput') as HTMLInputElement;
    const filter = input.value.toUpperCase();
    const table = document.getElementById('dataTable') as HTMLTableElement;
    const tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
      const td = tr[i].getElementsByTagName('td')[0];
      if (td) {
        const txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  }
}