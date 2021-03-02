import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsMapsComponent } from './rxjs-maps.component';

describe('RxjsMapsComponent', () => {
  let component: RxjsMapsComponent;
  let fixture: ComponentFixture<RxjsMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjsMapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
