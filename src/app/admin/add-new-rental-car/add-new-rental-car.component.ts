import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/core/models/vehicle';
import { VehicleService } from 'src/app/shared/services/vehicle.service';

@Component({
  selector: 'app-add-new-rental-car',
  templateUrl: './add-new-rental-car.component.html',
  styleUrls: ['./add-new-rental-car.component.scss']
})
export class AddNewRentalCarComponent {
  public newCarForm!: FormGroup;
  public id?: string;
    
  constructor(private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.newCarForm = new FormGroup({
      brand: new FormControl('', [Validators.required, Validators.minLength(2)]),
      model: new FormControl('', [Validators.required, Validators.minLength(2)]),
      dailyRate: new FormControl('', [Validators.required]),
      images: new FormControl([null])
    });

    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id') ?? undefined;

      if(this.id) {
        this.vehicleService.getVehicleWithId(this.id).subscribe({
          next: (data) => {
            console.log(data);
            const vehicle = data as Vehicle;
            this.newCarForm.setValue({
              brand: vehicle.brand,
              model: vehicle.model,
              dailyRate: vehicle.dailyRate,
              images: vehicle.images
            })
          }, error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }

    onFileChange(event: any) {
      if (event.target.files && event.target.files.length > 0) {
        const files = Array.from(event.target.files) as File[];
        const reader = new FileReader();
        const images: string[] = [];

        files.forEach(file => {
          reader.onload = () => {
            const base64 = reader.result as string;
            images.push(base64);
          };

          reader.readAsDataURL(file);
        });

        this.newCarForm.patchValue({images: images});
      }
    }

    onClickSave() {
      const vehicle: Vehicle = {
        brand: this.brand,
        model: this.model,
        dailyRate: this.dailyRate,
        images: this.images
      }

      if(this.id) {
        this.vehicleService.updateVehicleWithId(this.id, vehicle).subscribe({
          next: (data) => {
          console.log(data);
          this.router.navigateByUrl('/admin/cars');
          }, error: (err) => {
            console.log(err);
          this.router.navigateByUrl('/admin/cars');
          }
        });
      } else
        this.vehicleService.createVehicle(vehicle).subscribe({
          next: (data) => {
          console.log(data);
          this.router.navigateByUrl('/admin/cars');
          }, error: (err) => {
            console.log(err);
          this.router.navigateByUrl('/admin/cars');
          }
        });
    }

    public get images() {
      return this.newCarForm.get('images')?.value;
    }

    public get brand() {
      return this.newCarForm.get('brand')?.value;
    }

    public get model() {
      return this.newCarForm.get('model')?.value;
    }

    public get dailyRate() {
      return this.newCarForm.get('dailyRate')?.value;
    }

}
