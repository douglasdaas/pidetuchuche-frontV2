import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent  } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [
  { path:'', component: HomeComponent, 
    pathMatch: 'full',
    loadChildren:()=> import('./home/home.module').then(mod => mod.HomeModule) },
  { path:'admin', component: AdminComponent, pathMatch: 'full',
    loadChildren:()=> import('./admin/admin.module').then(mod => mod.AdminModule)},
  { path:'**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
