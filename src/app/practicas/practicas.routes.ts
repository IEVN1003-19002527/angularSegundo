import { Routes } from "@angular/router";

export default [
    {
        path: 'resistencias2',
        loadComponent: (): Promise<any> => import('./resistencias2/resistencias2.component'),
    },
    {
        path: 'registros',
        loadComponent: (): Promise<any> => import('./registros/registros.component'),
    }
] as Routes
