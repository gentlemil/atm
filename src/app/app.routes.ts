import { Routes } from '@angular/router';
import { ATM_ROUTES } from './pages/routes';

export const routes: Routes = [
  { path: '', children: ATM_ROUTES },
  { path: '**', redirectTo: '/' },
];
