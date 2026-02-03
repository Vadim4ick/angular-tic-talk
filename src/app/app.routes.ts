import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/pages/search-page/search-page').then((m) => m.SearchPage),
  },
  {
    path: 'login',
    loadComponent: () => import('@/pages/login-page/login-page').then((m) => m.LoginPage),
  },

  {
    path: '**',
    loadComponent: () =>
      import('@/pages/not-found-page/not-found-page').then((m) => m.NotFoundPage),
  },
];
