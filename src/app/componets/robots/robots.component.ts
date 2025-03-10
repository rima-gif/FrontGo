import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgFor,NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importez FormsModule pour utiliser ngModel
import { RobotService } from '../../services/robot.service';

interface Robot {
  name: string;
  isConnected: boolean;
}

@Component({
  selector: 'app-robots',
  standalone: true,
  imports: [NgFor, MatIconModule, FormsModule, NgIf],
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.css']
})
export class RobotsComponent implements OnInit {
  robots: Robot[] = [];
  showAddRobotModal: boolean = false;
  newRobot: Robot = { name: '', isConnected: false };

  constructor(private robotService: RobotService) {}

  ngOnInit(): void {
    this.loadRobots();
  }

  loadRobots(): void {
    this.robotService.getAllRobots().subscribe((data) => {
      this.robots = data;
    });
  }

  openAddRobotModal(): void {
    this.showAddRobotModal = true; // Corrigé (avant c'était `false`)
  }

  closeAddRobotModal(): void {
    this.showAddRobotModal = false;
    this.newRobot = { name: '', isConnected: false }; // Réinitialisation
  }

  saveRobot(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Token JWT manquant !");
      return;
    }

    // Conversion explicite de isConnected en boolean
    this.newRobot.isConnected = this.newRobot.isConnected === true;

    this.robotService.addRobot(this.newRobot, token).subscribe({
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
        tr[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
      }
    }
  }
}