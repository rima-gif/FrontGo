import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RobotService } from '../../services/robot.service';
import { Robot } from '../../models/robot.model';
import { CommonModule } from '@angular/common'; // Importer CommonModule


@Component({
  selector: 'app-robots',
  standalone: true,
  imports: [NgFor, MatIconModule, FormsModule, NgIf,CommonModule],
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.css']
})
export class RobotsComponent implements OnInit {
  robots: Robot[] = [];
  showAddRobotModal: boolean = false;
  showEditRobotModal: boolean = false; 
  newRobot: Robot = { name: '', status: '' };
  editIndex: number = -1; 

  constructor(private robotService: RobotService) {}

  ngOnInit(): void {
    this.loadRobots();
  }

  loadRobots(): void {
    this.robotService.getAllRobots().subscribe({
      next: (data) => {
        this.robots = data;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des robots", err);
        alert("Erreur lors de la récupération des robots !");
      }
    });
  }

  openAddRobotModal(): void {
    this.showAddRobotModal = true;
  }

  closeAddRobotModal(): void {
    this.showAddRobotModal = false;
    this.newRobot = { name: '', status: '' };  
  }

  saveRobot(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Token JWT manquant !");
      return;
    }
  
    // Ne pas modifier la valeur de status ici, elle est déjà correctement définie par l'utilisateur.
    // Enregistrer le robot
    this.robotService.addRobot(this.newRobot).subscribe({
      next: (robot) => {
        this.robots.push(robot);
        this.closeAddRobotModal();
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout du robot", err);
        alert("Ajout refusé : vous devez être SUPER_ADMIN");
      }
    });
  }
  
  // Supprimer un robot
  deleteRobot(index: number): void {
    const robotId = this.robots[index]?.id;

    if (robotId === undefined) {
      alert("Id du robot introuvable !");
      return;
    }

    this.robotService.deleteRobot(robotId).subscribe({
      next: () => {
        this.robots.splice(index, 1);
      },
      error: (err) => {
        console.error("Erreur lors de la suppression du robot", err);
        alert("Suppression refusée : vous devez être SUPER_ADMIN");
      }
    });
  }

  // Ouvrir le modal d'édition d'un robot
  editRobot(index: number): void {
    this.editIndex = index;
    this.newRobot = { ...this.robots[index] };  // Préparer les données du robot pour l'édition
    this.showEditRobotModal = true;  // Afficher le modal
  }

  // Fermer le modal d'édition
  closeEditRobotModal(): void {
    this.showEditRobotModal = false;
    this.newRobot = { name: '', status: '' };  // Réinitialiser les champs
  }

  // Sauvegarder les modifications d'un robot
  saveEditedRobot(): void {
    const robotId = this.newRobot.id?.toString();  // Assurez-vous que l'ID est un string

    if (!robotId) {
      alert("Id du robot est manquant !");
      return;
    }

    // Appeler le service pour mettre à jour le robot
    this.robotService.updateRobot(robotId, this.newRobot).subscribe({
      next: () => {
        // Mettre à jour le robot dans la liste
        this.robots[this.editIndex] = this.newRobot;
        this.closeEditRobotModal();
        alert("Robot mis à jour avec succès !");
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour du robot", err);
        alert(err.message || "Erreur lors de la mise à jour du robot !");
      }
    });
  }

  // Rechercher dans la table des robots
  searchTable(): void {
    const input = document.getElementById('myInput') as HTMLInputElement;
    const filter = input.value.toUpperCase();
    const table = document.getElementById('dataTable') as HTMLTableElement;
    const tr = table?.getElementsByTagName('tr');

    if (tr) {
      for (let i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td')[0];
        if (td) {
          const txtValue = td.textContent || td.innerText;
          tr[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
        }
      }
    }
  }
}