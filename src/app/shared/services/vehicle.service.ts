import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from 'src/app/core/models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  public main_url = 'http://localhost:3000/vehicles';

  constructor(private http: HttpClient) { }

  public getVehicleWithId(id: string) {
    return this.http.get(this.main_url + `/${id}`, {withCredentials: true});
  }

  public getVehicles() {
    return this.http.get(this.main_url, {withCredentials: true});
  }

  public updateVehicleWithId(id: string, vehicle: Vehicle) {
    return this.http.put(this.main_url + `/${id}`, vehicle, {withCredentials: true});
  }

  public deleteVehicleWithId(id: string) {
    return this.http.delete(this.main_url + `/${id}`, {withCredentials: true});
  }

  public createVehicle(vehicle: Vehicle) {
    return this.http.post(this.main_url, vehicle, {withCredentials: true});
  }
}
