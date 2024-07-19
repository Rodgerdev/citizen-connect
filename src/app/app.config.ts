import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { tokenInterceptorProvider } from './interceptors/token.interceptor';
import { appReducers } from './store/app.state';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthGuard } from './guards/auth.guard';
import { routes } from './app.routes';

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    tokenInterceptorProvider,
    provideStore(appReducers),
    provideEffects([AuthEffects]),
    importProvidersFrom(StoreModule.forRoot(appReducers))
  ]
};
