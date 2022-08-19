import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingAndreviewComponent } from './rating-andreview.component';

describe('RatingAndreviewComponent', () => {
  let component: RatingAndreviewComponent;
  let fixture: ComponentFixture<RatingAndreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingAndreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingAndreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
