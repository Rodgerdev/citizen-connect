import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';

export interface AppState {
  auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer
};
