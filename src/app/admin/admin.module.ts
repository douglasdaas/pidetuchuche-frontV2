import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from '../components/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { HomeModule } from '../home/home.module';
@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    HomeModule
  ]
})
export class AdminModule { }
