import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Bookings, Status } from 'src/app/core/models/bookings';
import { ExtraService } from 'src/app/core/models/extra-services';
import { Vehicle } from 'src/app/core/models/vehicle';
import { BookingService } from 'src/app/shared/services/booking.service';
import { ExtraServiceService } from 'src/app/shared/services/extra-service.service';
import { VehicleService } from 'src/app/shared/services/vehicle.service';

dayjs.extend(utc);

@Component({
  selector: 'app-car-rental',
  templateUrl: './car-rental.component.html',
  styleUrls: ['./car-rental.component.scss']
})
export class CarRentalComponent implements OnInit {
  selected?: { startDate: Dayjs, endDate: Dayjs };
  id?: string;
  booking_id?: string;
  public vehicle?: Vehicle;
  extraServices?: ExtraService[];
  selectedExtraServices: ExtraService[] = [];
  todayDate: Date = new Date();
  today: Dayjs = dayjs(`${this.todayDate.getFullYear()}-${this.todayDate.getMonth()+1}-${this.todayDate.getDate()}`);

  constructor(private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private bookingService: BookingService,
    private extraServiceService: ExtraServiceService
  ) {}

  bookedDates: Dayjs[] = [];

  isInvalidDate = (date: Dayjs) => {
    return this.bookedDates.some(d => d.isSame(date, 'day'));
  };

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
    this.id = params.get('id') ?? undefined;

    if(this.id) {
      this.vehicleService.getVehicleWithId(this.id).subscribe({
        next: (value) => {
          console.log(value);
          this.vehicle = value as Vehicle;
        }, error(err) {
          console.log(err);
        },
      });

      this.bookingService.getBookingWithVehicleId(this.id).subscribe({
        next: (data) => {
          console.log(data);
          const bookings = data as Bookings[];
          
          bookings.forEach(booking => {
            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);
            const number = endDate.getDate() - startDate.getDate();
            
            if(number === 0) {
              this.bookedDates.push(dayjs(`${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`));
            }

            for(let i = 0; i < number; i++) {
              this.bookedDates.push(dayjs(`${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()+i}`));
            }
            console.log(this.bookedDates);
          });
        }, error: (error) => {
          console.log(error);
        }
      });

       this.extraServiceService.getExtraServices().subscribe({
        next: (data) => {
          console.log(data);
          this.extraServices = data as ExtraService[];
        }, error: (error) => {
          console.log(error);
        }});
    }


  });

  this.route.queryParamMap.subscribe(params => {
        this.booking_id = params.get('booking_id') ?? undefined; 

        if(this.booking_id) {
          this.bookingService.getBookingWithId(this.booking_id).subscribe({
            next: (data) => {
              console.log(data);
              const booking = data as Bookings;
              const startDate = new Date(booking.startDate);
              const endDate =new Date(booking.endDate);

              const startDateString = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`;
              const endDateString = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`;

              console.log(startDateString,endDateString);

              this.selected = {
                startDate: dayjs(startDateString),
                endDate: dayjs(endDateString)
              };

              this.vehicleService.getVehicleWithId(booking.vehicleId).subscribe({
                next: (value) => {
                  console.log(value);
                  this.vehicle = value as Vehicle;
                }, error(err) {
                  console.log(err);
                },
              });

              this.extraServiceService.getExtraServices().subscribe({
              next: (data) => {
                console.log(data);
                this.extraServices = data as ExtraService[];
                this.selectedExtraServices = this.extraServices.filter(x => x._id && booking.extraServiceIds.includes(x._id));
              }, error: (error) => {
                console.log(error);
              }});
        }
      });
  }
});
}

  onClickSelect(id?: string) {
    const extraService = this.extraServices?.find(x => x._id === id);
    if(extraService) 
      if(this.selectedExtraServices.includes(extraService)) {
        const index = this.selectedExtraServices.findIndex(x => x._id === id);
        this.selectedExtraServices.splice(index, 1);
      } else {
        this.selectedExtraServices.push(extraService);
      }
  }

  onClickBook() {
    let totalPrice = this.getTotalPrice();
    const userId = localStorage.getItem("user_id");
    if(userId && this.selected) {
      if(this.id) {
        const booking: Bookings = {
          userId: userId,
          vehicleId: this.id,
          startDate: String(this.selected.startDate),
          endDate: String(this.selected.endDate),
          createdAt: String(new Date()),
          totalPrice: totalPrice,
          status: Status.AwaitingPayment,
          extraServiceIds: this.selectedExtraServices.map(x => x._id ?? '')
        };

        this.bookingService.createBooking(booking).subscribe({
          next: (data) => {
            console.log(data);
            window.location.reload();
          }, error: (error) => {
            console.log(error);
            window.location.reload();
          }
        });
      } else if(this.booking_id && this.vehicle) {
        const booking: Bookings = {
          userId: userId,
          vehicleId: this.vehicle._id ?? '',
          startDate: String(this.selected.startDate),
          endDate: String(this.selected.endDate),
          createdAt: String(new Date()),
          totalPrice: totalPrice,
          status: Status.AwaitingPayment,
          extraServiceIds: this.selectedExtraServices.map(x => x._id ?? '')
        };

        this.bookingService.updateBookingWithId(this.booking_id,booking).subscribe({
          next: (data) => {
            console.log(data);
            window.location.reload();
          }, error: (error) => {
            console.log(error);
            window.location.reload();
          }
        });

      }
    }
  }

  getTotalPrice(): number {
    let sum = 0;
    if(this.vehicle && this.selectedExtraServices) {
      sum += this.vehicle.dailyRate;

      this.selectedExtraServices.forEach(x => {
        sum += x.pricePerDay;
      });
    }
    return sum;
  }
}
