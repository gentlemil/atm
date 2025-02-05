import { Routes } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

export const ATM_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./landing-page/landing-page.component').then(
            (x) => x.LandingPageComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((x) => x.LoginComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (x) => x.DashboardComponent
          ),
      },
      {
        path: 'balance',
        loadComponent: () =>
          import('./balance/balance.component').then((x) => x.BalanceComponent),
      },
      {
        path: 'withdraw',
        loadComponent: () =>
          import('./withdraw/withdraw.component').then(
            (x) => x.WithdrawComponent
          ),
      },
    ],
  },
];
