import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { LoginReq, LoginResponse, RegisterReq, RegisterResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { id: '1', username: 'citizenUser', email: 'citizen@example.com', role: 'citizen', password:'citizen1' },
    { id: '2', username: 'govUser', email: 'government@example.com', role: 'government', password:'government1' },
    { id: '3', username: 'adminUser', email: 'admin@example.com', role: 'admin', password: 'admin1' }
  ];
  private BASE_URL = 'http://localhost:3000/auth/';
  private tokenKey = 'auth-token';
  private userKey = 'auth-user';

  login(data: LoginReq): Observable<LoginResponse> {
    const user = this.users.find(u => u.email === data.email && u.password === data.password);
    if (user) {
      const token = 'dummy-token'; // Simulate a JWT token
      this.setToken(token);
      this.setUser(user);
      return of({ token, user }).pipe(delay(500));
    } else {
      return throwError(() => new Error('Invalid credentials')).pipe(delay(500));
    }
  }

  register(data: RegisterReq): Observable<RegisterResponse> {
    const newUser: User = { id: '4', username: data.username, email: data.email, role: 'citizen', password: data.password };
    const token = 'dummy-token'; // Simulate a JWT token
    this.users.push(newUser);
    this.setToken(token);
    this.setUser(newUser);
    return of({ token, user: newUser }).pipe(delay(500));
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}
