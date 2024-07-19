import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Incident } from '../models/incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private BASE_URL = 'http://localhost:3000/incidents/';

  // constructor(private http: HttpClient) {}

  // getIncidents(): Observable<Incident[]> {
  //   return this.http.get<Incident[]>(this.BASE_URL);
  // }

  // reportIncident(data: Incident): Observable<Incident> {
  //   return this.http.post<Incident>(this.BASE_URL, data);
  // }

  private incidents: Incident[] = [
    {
      id: '1',
      description: 'Police officers deny peaceful protestors their constitutional right to demonstrate in Nyeri county.',
      multimedia: ['https://cdn.pixabay.com/photo/2021/03/27/18/16/riot-6129239_1280.jpg'],
      reportedBy: 'Hon John Doe @john_doe77'
    }
  ];

  getIncidents(): Observable<Incident[]> {
    return of(this.incidents);
  }

  addIncident(incident: Incident): Observable<void> {
    this.incidents.push(incident);
    return of();
  }
}
