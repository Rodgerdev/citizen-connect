import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login({ email: action.email, password: action.password }).pipe(
          map(response => AuthActions.loginSuccess({ token: response.token, user: response.user })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map((action) => {
          if (action.user.role === 'citizen') {
            this.router.navigate(['/educate']);
          } else if (action.user.role === 'government') {
            this.router.navigate(['/dashboard']);
          } else if (action.user.role === 'admin') {
            this.router.navigate(['/pending-approvals']);
          }
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
