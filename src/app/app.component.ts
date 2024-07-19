import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './store/auth/auth.state';
import { loginSuccess } from './store/auth/auth.actions';
import { User } from './models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    HeaderComponent,
    CommonModule,
    RouterModule,
    LoginComponent,
    ForgotPasswordComponent
]
})
export class AppComponent implements OnInit {
  title = 'citizen-connect';

  constructor(private store: Store<{ auth: AuthState }>, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('auth-token');
    const user = localStorage.getItem('auth-user');
    if (token && user) {
      const parsedUser: User = JSON.parse(user);
      this.store.dispatch(loginSuccess({ token, user: parsedUser }));
      this.redirectBasedOnRole(parsedUser.role);
    }
  }

  redirectBasedOnRole(role: string): void {
    switch (role) {
      case 'citizen':
        this.router.navigate(['/educate']);
        break;
      case 'government':
        this.router.navigate(['/incidents']);
        break;
      case 'admin':
        this.router.navigate(['/all-users']);
        break;
      default:
        this.router.navigate(['/home']);
    }
  }
}
