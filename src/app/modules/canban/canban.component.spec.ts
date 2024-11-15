import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanbanComponent } from './canban.component';

describe('CanbanComponent', () => {
  let component: CanbanComponent;
  let fixture: ComponentFixture<CanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanbanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
