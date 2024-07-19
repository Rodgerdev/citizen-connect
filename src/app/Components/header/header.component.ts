import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/auth/auth.state';
import { loginSuccess, logout } from '../../store/auth/auth.actions';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  user$: Observable<User | null>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.isLoggedIn$ = this.store.select(state => state.auth.isLoggedIn);
    this.user$ = this.store.select(state => state.auth.user);
  }

  ngOnInit(): void {
    // Check local storage for user data and update the state
    const token = localStorage.getItem('auth-token');
    const user = localStorage.getItem('auth-user');
    if (token && user) {
      this.store.dispatch(loginSuccess({ token, user: JSON.parse(user) }));
    }
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
