import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorsDireccionComponent } from './field-errors-direccion.component';

describe('FieldErrorsDireccionComponent', () => {
  let component: FieldErrorsDireccionComponent;
  let fixture: ComponentFixture<FieldErrorsDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldErrorsDireccionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldErrorsDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
