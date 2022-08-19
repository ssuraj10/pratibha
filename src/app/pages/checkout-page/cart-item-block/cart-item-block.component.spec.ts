import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemBlockComponent } from './cart-item-block.component';

describe('CartItemBlockComponent', () => {
  let component: CartItemBlockComponent;
  let fixture: ComponentFixture<CartItemBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartItemBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
