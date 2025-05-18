import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/core/models/vehicle';
import { VehicleService } from 'src/app/shared/services/vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  vehicles: Vehicle[] = []

  constructor(private router: Router,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles as Vehicle[];
    });
  }

  public onClickMore(id?: string) {
    this.router.navigateByUrl(`/car-rental-platform/car-rental?id=${id}`);
  }
}
