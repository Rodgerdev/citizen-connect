import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AiChatComponent implements OnInit {
  documentTitle: string = '';
  model: string = 'gpt-3.5';
  messages: string[] = [];
  userMessage: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.documentTitle = params['title'] || 'Document';
    });
  }

  switchModel(model: string): void {
    this.model = model;
  }

  sendMessage(): void {
    if (this.userMessage.trim()) {
      this.messages.push(this.userMessage);
      this.userMessage = '';
      // Where I'll handle the response from the AI chat
    }
  }
}
