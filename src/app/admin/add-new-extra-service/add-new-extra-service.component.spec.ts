import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AddNewExtraServiceComponent } from './add-new-extra-service.component';

describe('AddNewExtraServiceComponent', () => {
  let component: AddNewExtraServiceComponent;
  let fixture: ComponentFixture<AddNewExtraServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewExtraServiceComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewExtraServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
