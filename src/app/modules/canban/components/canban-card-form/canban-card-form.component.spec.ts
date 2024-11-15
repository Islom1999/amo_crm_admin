import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanbanCardFormComponent } from './canban-card-form.component';

describe('CanbanCardFormComponent', () => {
  let component: CanbanCardFormComponent;
  let fixture: ComponentFixture<CanbanCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanbanCardFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanbanCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
