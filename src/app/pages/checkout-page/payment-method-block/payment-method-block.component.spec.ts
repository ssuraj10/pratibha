import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodBlockComponent } from './payment-method-block.component';

describe('PaymentMethodBlockComponent', () => {
  let component: PaymentMethodBlockComponent;
  let fixture: ComponentFixture<PaymentMethodBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentMethodBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
