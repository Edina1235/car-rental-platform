import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddNewRentalCarComponent } from './add-new-rental-car/add-new-rental-car.component';
import { AddNewExtraServiceComponent } from './add-new-extra-service/add-new-extra-service.component';
import { CarsComponent } from './cars/cars.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, pathMatch: "full"},
  {path: 'add-new-rental-car', component: AddNewRentalCarComponent, pathMatch: "full"},
  {path: 'add-new-extra-service', component: AddNewExtraServiceComponent, pathMatch: "full"},
  {path: 'cars', component: CarsComponent, pathMatch: "full"},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
