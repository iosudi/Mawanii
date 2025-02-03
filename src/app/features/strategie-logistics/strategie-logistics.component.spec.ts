import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategieLogisticsComponent } from './strategie-logistics.component';

describe('StrategieLogisticsComponent', () => {
  let component: StrategieLogisticsComponent;
  let fixture: ComponentFixture<StrategieLogisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategieLogisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategieLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
