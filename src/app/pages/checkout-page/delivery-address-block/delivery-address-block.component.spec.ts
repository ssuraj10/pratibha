import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAddressBlockComponent } from './delivery-address-block.component';

describe('DeliveryAddressBlockComponent', () => {
  let component: DeliveryAddressBlockComponent;
  let fixture: ComponentFixture<DeliveryAddressBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryAddressBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAddressBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
