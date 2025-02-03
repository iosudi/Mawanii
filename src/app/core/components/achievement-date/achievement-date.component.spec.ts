import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementDateComponent } from './achievement-date.component';

describe('AchievementDateComponent', () => {
  let component: AchievementDateComponent;
  let fixture: ComponentFixture<AchievementDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievementDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
