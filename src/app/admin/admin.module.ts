import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddNewRentalCarComponent } from './add-new-rental-car/add-new-rental-car.component';
import { HomeComponent } from './home/home.component';
import { UpdateRentalCarsComponent } from './update-rental-cars/update-rental-cars.component';
import { RentedCarsComponent } from './rented-cars/rented-cars.component';


@NgModule({
  declarations: [
    AddNewRentalCarComponent,
    HomeComponent,
    UpdateRentalCarsComponent,
    RentedCarsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
