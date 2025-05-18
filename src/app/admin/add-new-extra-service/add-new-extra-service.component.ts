import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtraService } from 'src/app/core/models/extra-services';
import { ExtraServiceService } from 'src/app/shared/services/extra-service.service';

@Component({
  selector: 'app-add-new-extra-service',
  templateUrl: './add-new-extra-service.component.html',
  styleUrls: ['./add-new-extra-service.component.scss']
})
export class AddNewExtraServiceComponent {
public newExtraServiceForm!: FormGroup;
id?: string;
    
  constructor(private router: Router,
    private extraServiceService: ExtraServiceService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.newExtraServiceForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      pricePerDay: new FormControl('', [Validators.required]),
    });

    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id') ?? undefined;

      if(this.id)
        this.extraServiceService.getExtraServiceWithId(this.id).subscribe({
          next: (data) => {
            console.log(data);
            const extraService = data as ExtraService;

            this.newExtraServiceForm.setValue({
              name: extraService.name,
              description: extraService.description,
              pricePerDay: extraService.pricePerDay
            });
          }, error: (error) => {
            console.log(error);
          }
        });
    });
  }

    onClickSave() {
      const extraService: ExtraService = {
        name: this.name,
        description: this.description,
        pricePerDay: this.pricePerDay
      }

      if(this.id) {
        this.extraServiceService.updateExtraServiceWithId(this.id, extraService).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigateByUrl('/admin/cars');
          }, error: (error) => {
            console.log(error);
            this.router.navigateByUrl('/admin/cars');
          }
        });
      } else
        this.extraServiceService.createExtraService(extraService).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigateByUrl('/admin/cars');
          }, error: (error) => {
            console.log(error);
            this.router.navigateByUrl('/admin/cars');
          }
        });
    }

    public get name() {
      return this.newExtraServiceForm.get('name')?.value;
    }

    public get description() {
      return this.newExtraServiceForm.get('description')?.value;
    }

    public get pricePerDay() {
      return this.newExtraServiceForm.get('pricePerDay')?.value;
    }
}
