import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddNewRentalCarComponent } from './add-new-rental-car/add-new-rental-car.component';
import { HomeComponent } from './home/home.component';
import { RentedCarsComponent } from './rented-cars/rented-cars.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddNewExtraServiceComponent } from './add-new-extra-service/add-new-extra-service.component';
import { CarsComponent } from './cars/cars.component';


@NgModule({
  declarations: [
    AddNewRentalCarComponent,
    HomeComponent,
    RentedCarsComponent,
    AddNewExtraServiceComponent,
    CarsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
