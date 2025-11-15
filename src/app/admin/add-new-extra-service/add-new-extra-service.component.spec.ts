import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewExtraServiceComponent } from './add-new-extra-service.component';

describe('AddNewExtraServiceComponent', () => {
  let component: AddNewExtraServiceComponent;
  let fixture: ComponentFixture<AddNewExtraServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewExtraServiceComponent ]
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
