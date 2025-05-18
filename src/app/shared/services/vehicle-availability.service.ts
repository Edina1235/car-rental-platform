import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehicleAvailability } from 'src/app/core/models/vehicle-availability';

@Injectable({
  providedIn: 'root'
})
export class VehicleAvailabilityService {
  public main_url = 'http://localhost:3000/availability';

  constructor(private http: HttpClient) { }

  public getVehicleAvailabilityWithId(id: string) {
    return this.http.get(this.main_url + `/${id}`, {withCredentials: true});
  }

  public getVehicleAvailabilityWithVehicleId(vehicleId: string) {
    return this.http.get(this.main_url + `/vehicle/${vehicleId}`, {withCredentials: true});
  }

  public getVehicleAvailabilities() {
    return this.http.get(this.main_url, {withCredentials: true});
  }

  public updateVehicleAvailabilityWithId(id: string, vehicleAvailabilty: VehicleAvailability) {
    return this.http.put(this.main_url + `/${id}`, vehicleAvailabilty, {withCredentials: true});
  }

  public deleteVehicleAvailabilityWithId(id: string) {
    return this.http.delete(this.main_url + `/${id}`, {withCredentials: true});
  }

  public createVehicleAvailability(vehicleAvailabilty: VehicleAvailability) {
    return this.http.post(this.main_url, vehicleAvailabilty, {withCredentials: true});
  }
}
