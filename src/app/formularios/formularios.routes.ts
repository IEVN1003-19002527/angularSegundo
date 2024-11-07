import { Routes } from "@angular/router";

export default [
    {
        path: 'zodiaco',
        loadComponent: (): Promise<any> => import('./zodiaco/zodiaco.component'),
    },
    {
        path: 'ejemplo1',
        loadComponent: (): Promise<any> => import('./ejemplo1/ejemplo1.component'),
    }
] as Routes
