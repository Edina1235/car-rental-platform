import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RentedCarsComponent } from './rented-cars/rented-cars.component';
import { UpdateRentalCarsComponent } from './update-rental-cars/update-rental-cars.component';
import { AddNewRentalCarComponent } from './add-new-rental-car/add-new-rental-car.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, pathMatch: "full"},
  {path: 'add-new-rental-car', component: AddNewRentalCarComponent, pathMatch: "full"},
  {path: 'rented-cars', component: RentedCarsComponent, pathMatch: "full"},
  {path: 'update-rental-cars', component: UpdateRentalCarsComponent, pathMatch: "full"},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
