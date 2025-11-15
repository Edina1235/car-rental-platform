import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewRentalCarComponent } from './add-new-rental-car.component';

describe('AddNewRentalCarComponent', () => {
  let component: AddNewRentalCarComponent;
  let fixture: ComponentFixture<AddNewRentalCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRentalCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewRentalCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
