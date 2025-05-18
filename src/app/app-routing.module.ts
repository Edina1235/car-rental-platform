import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminGuard } from './core/guard/admin.guard';

const routes: Routes = [
  {path: 'car-rental-platform', loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate: [AdminGuard]},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard]},
  {path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
