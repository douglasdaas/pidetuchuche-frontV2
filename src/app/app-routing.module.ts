import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanPassGuard } from './can-pass.guard';


const routes: Routes = [
  { path:'home',
    loadChildren:'./home/home.module#HomeModule', 
  },
  { path:'admin',
    canLoad:[CanPassGuard],
    loadChildren:'./admin/admin.module#AdminModule'},
  {
    path:'login',
    loadChildren:'./login/login.module#LoginModule'
  },
  { path:"", loadChildren:'./home/home.module#HomeModule'},
  { path:'**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
