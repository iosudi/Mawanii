import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoralsComponent } from './morals.component';

describe('MoralsComponent', () => {
  let component: MoralsComponent;
  let fixture: ComponentFixture<MoralsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoralsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
