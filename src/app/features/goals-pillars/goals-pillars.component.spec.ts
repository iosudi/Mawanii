import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsPillarsComponent } from './goals-pillars.component';

describe('GoalsPillarsComponent', () => {
  let component: GoalsPillarsComponent;
  let fixture: ComponentFixture<GoalsPillarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsPillarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalsPillarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
