import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./Components/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent) },
  { path: 'educate', loadComponent: () => import('./Components/educate/educate.component').then(m => m.EducateComponent) },
  { path: 'views', loadComponent: () => import('./Components/views/views.component').then(m => m.ViewsComponent) },
  { path: 'incidents', loadComponent: () => import('./Components/incidents/incidents.component').then(m => m.IncidentsComponent) },
  { path: 'polls', loadComponent: () => import('./Components/polls/polls.component').then(m => m.PollsComponent) },
  { path: 'dashboard', loadComponent: () => import('./Components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'pending-approvals', loadComponent: () => import('./Components/pending-approvals/pending-approvals.component').then(m => m.PendingApprovalsComponent) },
  { path: 'all-users', loadComponent: () => import('./Components/all-users/all-users.component').then(m => m.AllUsersComponent) },
  { path: 'ai-chat', loadComponent: () => import('./Components/ai-chat/ai-chat.component').then(m => m.AiChatComponent) },
  { path: 'forgot-password', loadComponent: () => import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
  { path: 'reset-password', loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent) },
  { path: '**', redirectTo: 'home' }
];
