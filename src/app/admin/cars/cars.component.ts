import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExtraService } from 'src/app/core/models/extra-services';
import { Vehicle } from 'src/app/core/models/vehicle';
import { ExtraServiceService } from 'src/app/shared/services/extra-service.service';
import { VehicleService } from 'src/app/shared/services/vehicle.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent {
  vehicles: Vehicle[] = [];
  extraServices: ExtraService[] = [];
  
  constructor(private router: Router,
    private vehicleService: VehicleService,
    private extraService: ExtraServiceService
  ) {}

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles as Vehicle[];
    });

    this.extraService.getExtraServices().subscribe(extraServices => {
      this.extraServices = extraServices as ExtraService[];
    });
  }

  public onClickUpdate(id?: string) {
    this.router.navigateByUrl(`/admin/add-new-rental-car?id=${id}`);
  }

  public onClickUpdateExtraService(id?: string) {
    this.router.navigateByUrl(`/admin/add-new-extra-service?id=${id}`);
  }

  public onClickDelete(id?: string) {
    if(id)
      this.vehicleService.deleteVehicleWithId(id).subscribe({
        next: (data) => {
          console.log(data);
          window.location.reload();
        }, error: (error) => {
          console.log(error);
          window.location.reload();
        }
      });
  }

  public onClickDeleteExtraService(id?: string) {
    if(id)
      this.extraService.deleteExtraServiceWithId(id).subscribe({
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
