import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '../components/home/home.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ProductoComponent } from '../components/producto/producto.component';
import { SliderPrincipalComponent } from '../components/sliderPrincipal/sliderPrincipal.component';


@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    ProductoComponent,
    SliderPrincipalComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports:[  
    FooterComponent,
    ProductoComponent,
    SliderPrincipalComponent
  ]
})
export class HomeModule { }
