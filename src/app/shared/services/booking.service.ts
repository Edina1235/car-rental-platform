import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookings } from 'src/app/core/models/bookings';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  public main_url = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) { }

  public getBookings() {
    return this.http.get(this.main_url, {withCredentials: true});
  }

  public getBookingWithId(id: string) {
    return this.http.get(this.main_url + `/${id}`, {withCredentials: true});
  }

  public getBookingWithUserId(userId: string) {
    return this.http.get(this.main_url + `/user/${userId}`, {withCredentials: true});
  }

  public getBookingWithVehicleId(vehicleId: string) {
    return this.http.get(this.main_url + `/vehicle/${vehicleId}`, {withCredentials: true});
  }

  public createBooking(booking: Bookings) {
    return this.http.post(this.main_url, booking, {withCredentials: true});
  }

  public updateBookingWithId(id: string, booking: Bookings) {
    return this.http.put(this.main_url + `/${id}`, booking, {withCredentials: true});
  }

  public deleteBookingWithId(id: string) {
    return this.http.delete(this.main_url + `/${id}`, {withCredentials: true});
  }

}
