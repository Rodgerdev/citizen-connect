import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ViewService } from '../../services/view.service';
import { View } from '../../models/view.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class ViewsComponent implements OnInit {
  views$: Observable<View[]> | undefined;
  userRole: string = 'citizen';  // This should be dynamically set based on actual user role
  isPopupVisible: boolean = false;
  newViewMessage: string = '';
  summary: string = '';

  constructor(private viewService: ViewService) {}

  ngOnInit(): void {
    this.views$ = this.viewService.getViews();
  }

  showAddViewPopup(): void {
    this.isPopupVisible = true;
  }

  closeAddViewPopup(): void {
    this.isPopupVisible = false;
    this.newViewMessage = '';
  }

  submitView(): void {
    if (this.newViewMessage.trim()) {
      this.viewService.addView({
        id: '',
        name: 'Current User', // Replace with actual user name
        message: this.newViewMessage
      }).subscribe(() => {
        this.views$ = this.viewService.getViews(); // Refresh the views list
        this.closeAddViewPopup();
      });
    }
  }

  summarizeViews(): void {
    this.viewService.getSummary().subscribe((summary: string) => {
      this.summary = summary;
    });
  }
}
