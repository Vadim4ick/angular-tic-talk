import { MainLayout } from '@/shared/layouts/main-layout/main-layout';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('@/pages/search-page/search-page').then((m) => m.SearchPage),
      },
      {
        path: 'profile',
        loadComponent: () => import('@/pages/profile-page/profile-page').then((m) => m.ProfilePage),
      },
    ],
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
