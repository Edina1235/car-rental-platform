import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarRentalComponent } from './car-rental/car-rental.component';
import { RentedCarsComponent } from './rented-cars/rented-cars.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, pathMatch: "full"},
  {path: 'car-rental', component: CarRentalComponent, pathMatch: "full"},
  {path: 'rented-cars', component: RentedCarsComponent, pathMatch: "full"},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
