import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFidComponent } from './rfid.component';

describe('RFidComponent', () => {
  let component: RFidComponent;
  let fixture: ComponentFixture<RFidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RFidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RFidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
