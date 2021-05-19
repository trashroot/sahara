import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule),
    },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent }
];