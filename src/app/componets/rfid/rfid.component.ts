import { Component, OnInit } from '@angular/core';
import{RadioFrequencyService} from '../../services/radio-frequency.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-rfid',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './rfid.component.html',
  styleUrl: './rfid.component.css'
})
export class RFidComponent implements OnInit {
  frequencies: any[] = [];
  frequencyForm: FormGroup;
  isEditing: boolean = false;
  editingId: number | null = null;
  showAddFrequencyModal = false;
  isSuperAdmin = false;

  constructor(private radioFrequencyService: RadioFrequencyService, private authService: AuthService, private fb: FormBuilder) {
    this.frequencyForm = this.fb.group({
      uid: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.getAllFrequencies();
  }

  getAllFrequencies() {
    this.radioFrequencyService.getAllFrequencies().subscribe(
      (data) => {
        console.log('Données récupérées :', data);
        this.frequencies = data;
      },
      (error) => {
        alert('Erreur lors de la récupération des UIDs: ' + error);
      }
    );
  }

  openAddModal() {
    this.isEditing = false;
    this.frequencyForm.reset();
    this.showAddFrequencyModal = true;
  }

  closeModal() {
    this.showAddFrequencyModal = false;
    this.isEditing = false;
    this.frequencyForm.reset();
  }

  saveUID() {
    if (this.frequencyForm.invalid) {
      return;
    }

    const uid = this.frequencyForm.value.uid;

    if (this.isEditing && this.editingId) {
      this.updateUID(this.editingId, uid);
    } else {
      this.radioFrequencyService.addUID(uid).subscribe(
        () => {
          this.getAllFrequencies();
          this.closeModal();
        },
        (error) => alert('Erreur lors de l\'ajout de l\'UID: ' + error.message)
      );
    }
  }

  updateUID(id: number, uid: string) {
    this.radioFrequencyService.updateUID(id, uid).subscribe(
      () => {
        this.getAllFrequencies();
        this.isEditing = false;
        this.closeModal();
      },
      (error) => alert('Erreur lors de la mise à jour de l\'UID: ' + error.message)
    );
  }

  editUID(frequency: any) {
    this.isEditing = true;
    this.editingId = frequency.id;
    this.frequencyForm.patchValue({ uid: frequency.uid });
    this.showAddFrequencyModal = true;
  }

  deleteUID(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet UID ?')) {
      this.radioFrequencyService.deleteUID(id).subscribe(
        () => this.getAllFrequencies(),
        (error) => alert('Erreur lors de la suppression de l\'UID: ' + error.message)
      );
    }
  }
}