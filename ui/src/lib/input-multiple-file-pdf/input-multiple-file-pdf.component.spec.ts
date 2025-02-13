import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputMultipleFilePdfComponent } from './input-multiple-file-pdf.component';

describe('InputMultipleFilePdfComponent', () => {
  let component: InputMultipleFilePdfComponent;
  let fixture: ComponentFixture<InputMultipleFilePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputMultipleFilePdfComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputMultipleFilePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
