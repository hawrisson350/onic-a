import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressBuilderComponent } from './address-builder.component';

describe('AddressBuilderComponent', () => {
  let component: AddressBuilderComponent;
  let fixture: ComponentFixture<AddressBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close', () => {
    component.guardarDireccion();
    component.cerrar();
    const close = component.numberOnly({ which: 32 })
    expect(close).toEqual(false)
  });
});
