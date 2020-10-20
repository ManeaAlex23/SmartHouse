import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient,HttpHandler } from '@angular/common/http';

const routes: Routes = [
  { path: './first-page/first-page.module', redirectTo: 'first-page', pathMatch: 'full' },
  
   { path: 'login',    loadChildren: () => import('./public/login/login.module').then( m => m.LoginPageModule)},
    {path: 'register',  loadChildren: () => import('./public/register/register.module').then( m => m.RegisterPageModule)},
   { path: 'dashboard', 
   canActivate:[AuthGuardService], loadChildren: () => import('./members/dashboard/dashboard.module').then( m => m.DashboardPageModule)},
  {
    path: 'back', 
    loadChildren: () => import('./back/back.module').then( m => m.BackPageModule)
  },
  {
    path: 'first-page',
    loadChildren: () => import('./first-page/first-page.module').then( m => m.FirstPagePageModule)
  },
  {
    path: 'admin-page',
    loadChildren: () => import('./admin-page/admin-page.module').then( m => m.AdminPagePageModule)
  },
  {
    path: 'display-info-for-admin',
    loadChildren: () => import('./display-info-for-admin/display-info-for-admin.module').then( m => m.DisplayInfoForAdminPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

