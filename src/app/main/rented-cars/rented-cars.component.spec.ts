import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RentedCarsComponent } from './rented-cars.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RentedCarsComponent', () => {
  let component: RentedCarsComponent;
  let fixture: ComponentFixture<RentedCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentedCarsComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
