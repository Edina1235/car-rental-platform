import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bookings } from 'src/app/core/models/bookings';
import { ExtraService } from 'src/app/core/models/extra-services';
import { Vehicle } from 'src/app/core/models/vehicle';
import { BookingService } from 'src/app/shared/services/booking.service';
import { ExtraServiceService } from 'src/app/shared/services/extra-service.service';
import { VehicleService } from 'src/app/shared/services/vehicle.service';

@Component({
  selector: 'app-rented-cars',
  templateUrl: './rented-cars.component.html',
  styleUrls: ['./rented-cars.component.scss']
})
export class RentedCarsComponent implements OnInit {
  bookings?: Bookings[];
  vehicles?: Vehicle[];
  extraServices?: ExtraService[];
  userId?: string;
  today: Date;

  private readonly bookingService = inject(BookingService);
  private readonly extraService = inject(ExtraServiceService);
  private readonly vehicleService = inject(VehicleService);
  private readonly router = inject(Router);
  
  constructor() {
    this.today = new Date();
  }

  ngOnInit() {
    this.userId = localStorage.getItem("user_id") ?? undefined;
    if(this.userId) {
      this.bookingService.getBookingWithUserId(this.userId).subscribe({
        next: (data) => {
          console.log(data);
          this.bookings = data as Bookings[];
        }, error: (error) => {
          console.log(error);
        }
      });

    this.extraService.getExtraServices().subscribe({
      next: (data) => {
        console.log(data);
        this.extraServices = data as ExtraService[];
      }, error: (error) => {
        console.log(error);
      }
    });

    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        console.log(data);
        this.vehicles = data as Vehicle[];
      }, error: (error) => {
        console.log(error);
      }
    });

    }
  }
  
  getExtraServiceName(id: string) {
    if(this.extraServices)
      return this.extraServices.find(x => x._id === id)?.name;
    return "";
  }

  getVehicleBrand(id: string) {
    if(this.vehicles)
      return this.vehicles.find(x => x._id === id)?.brand;
    return "";
  }

  getVehicleModel(id: string) {
    if(this.vehicles)
      return this.vehicles.find(x => x._id === id)?.model;
    return "";
  }

  onClickUpdate(id?: string) {
    this.router.navigateByUrl(`/car-rental-platform/car-rental?booking_id=${id}`);
  }

  onClickDelete(id?: string) {
    if(id) {
      this.bookingService.deleteBookingWithId(id).subscribe({
        next: (data) => {
          console.log(data);
          window.location.reload();
        }, error: (error) => {
          console.log(error);
          window.location.reload();
        }
      })
    }
  }

  getElerheto(startDate: string) {
    return new Date(startDate) > this.today;
  }
}
