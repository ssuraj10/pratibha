import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotByEmailComponent } from './forgot-by-email.component';

describe('ForgotByEmailComponent', () => {
  let component: ForgotByEmailComponent;
  let fixture: ComponentFixture<ForgotByEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotByEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
