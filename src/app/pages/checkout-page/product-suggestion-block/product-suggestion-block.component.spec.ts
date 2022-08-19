import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSuggestionBlockComponent } from './product-suggestion-block.component';

describe('ProductSuggestionBlockComponent', () => {
  let component: ProductSuggestionBlockComponent;
  let fixture: ComponentFixture<ProductSuggestionBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSuggestionBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSuggestionBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
