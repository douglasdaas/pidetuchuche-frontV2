import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent  } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'login', component: LoginComponent },
  { path:'admin', component:AdminComponent },
  { path:'**', component:HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
