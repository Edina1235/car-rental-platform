import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { CarRentalComponent } from './car-rental/car-rental.component';
import { RentedCarsComponent } from './rented-cars/rented-cars.component';
import { UpdateRentalCarsComponent } from './update-rental-cars/update-rental-cars.component';
import { RentalCarDetailsComponent } from './rented-cars/components/rental-car-details/rental-car-details.component';


@NgModule({
  declarations: [
    HomeComponent,
    CarRentalComponent,
    RentedCarsComponent,
    UpdateRentalCarsComponent,
    RentalCarDetailsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
