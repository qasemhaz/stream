import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./firstlaunch/firstlaunch.module').then((x)=>x.FirstlaunchModule)},
  {path:'user',loadChildren:()=>import('./home/home.module').then((x)=>x.HomeModule),canActivate:[AuthGuard]},
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then((x)=>x.AdminModule),canActivate:[AuthGuard]},
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then((x)=>x.AuthModule)},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
