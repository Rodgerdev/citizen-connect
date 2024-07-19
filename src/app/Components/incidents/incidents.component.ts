import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../services/incident.service';
import { Observable } from 'rxjs';
import { Incident } from '../../models/incident.model';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class IncidentsComponent {
  incidents$: Observable<Incident[]>;
  summary: string = '';
  userRole: string = 'government'; // Should be dynamically set based on actual user role
  showAddIncidentPopup: boolean = false;
  newIncident: Partial<Incident> = { description: '', multimedia: [] };

  constructor(private incidentService: IncidentService) {
    this.incidents$ = this.incidentService.getIncidents();
  }

  summarizeIncidents() {
    this.incidents$.subscribe(incidents => {
      const texts = incidents.map(incident => incident.description).join(' ');
      // Simulate AI summary
      this.summary = `Summary of incidents: ${texts}`;
    });
  }

  openAddIncidentPopup() {
    this.showAddIncidentPopup = true;
  }

  closeAddIncidentPopup() {
    this.showAddIncidentPopup = false;
  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.newIncident.multimedia = [];
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newIncident.multimedia!.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  submitIncident() {
    // Logic to submit the new incident
    const incident: Incident = {
      id: Date.now().toString(),
      description: this.newIncident.description || '',
      multimedia: this.newIncident.multimedia || [],
      reportedBy: 'Current User' //Should have info of user submitting
    };
    this.incidentService.addIncident(incident).subscribe(() => {
      this.closeAddIncidentPopup();
      this.incidents$ = this.incidentService.getIncidents();
    });
  }
}
