import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'), // Asegúrate de que el módulo se exporte correctamente
  },
  {
    path: 'formularios',
    loadChildren: () => import('./formularios/formularios.routes'),
  },
  {
    path: 'practicas',
    loadChildren: () => import('./practicas/practicas.routes'),
  }
];
