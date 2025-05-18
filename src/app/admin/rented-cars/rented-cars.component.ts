import { Component } from '@angular/core';
import { Bookings } from 'src/app/core/models/bookings';
import { ExtraService } from 'src/app/core/models/extra-services';
import { User } from 'src/app/core/models/user';
import { Vehicle } from 'src/app/core/models/vehicle';
import { BookingService } from 'src/app/shared/services/booking.service';
import { ExtraServiceService } from 'src/app/shared/services/extra-service.service';
import { UserService } from 'src/app/shared/services/user.service';
import { VehicleService } from 'src/app/shared/services/vehicle.service';

@Component({
  selector: 'app-rented-cars',
  templateUrl: './rented-cars.component.html',
  styleUrls: ['./rented-cars.component.scss']
})
export class RentedCarsComponent {
  bookings?: Bookings[];
  users?: User[];
  vehicles?: Vehicle[];
  extraServices?: ExtraService[];

  constructor(private bookingService: BookingService,
    private userService: UserService,
    private extraService: ExtraServiceService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        console.log(data);
        this.bookings = data as Bookings[];
      }, error: (error) => {
        console.log(error);
      }
    });

    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.users = data as User[];
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

  getUserEmail(id: string) {
    if(this.users)
      return this.users.find(x => x._id === id)?.email;
    return "";
  }
}
