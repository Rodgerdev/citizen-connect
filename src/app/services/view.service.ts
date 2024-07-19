import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { View } from '../models/view.model';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  getViews(): Observable<View[]> {
    return of([
      { id:'1', name: 'John Doe', message: 'The government must stop corruption.' },
      { id:'2', name: 'Mary Jane', message: 'The offices of the CASs are unconstitutional.' },
      { id:'3', name: 'Brian Mwangi', message: 'Reject the finance bill and say no to police brutality.' }
    ]);
  }

  addView(view: View): Observable<void> {
    // this.views.push(view);
    // Where I'll 
    return of();
  }

  getSummary(): Observable<string> {
    // Mocked summary for example purposes. Replace with actual AI call.
    return of('This is a summarized view from the AI.');
  }
}


