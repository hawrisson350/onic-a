import { Route } from '@angular/router';
import { LoginFormularyComponent } from './pages/login-formulary/login-formulary.component';

export const appRoutes: Route[] = [
    {
        path: 'login',
        component: LoginFormularyComponent,
    }
];
