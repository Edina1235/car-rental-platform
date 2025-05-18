import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { CarRentalComponent } from './car-rental/car-rental.component';
import { RentedCarsComponent } from './rented-cars/rented-cars.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    CarRentalComponent,
    RentedCarsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NgxDaterangepickerMd.forRoot(),
    FormsModule
  ]
})
export class MainModule { }
