import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanbanListFormComponent } from './canban-list-form.component';

describe('CanbanListFormComponent', () => {
  let component: CanbanListFormComponent;
  let fixture: ComponentFixture<CanbanListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanbanListFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanbanListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
