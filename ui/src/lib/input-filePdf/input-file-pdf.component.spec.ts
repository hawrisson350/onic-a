import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFilePdfComponent } from './input-file-pdf.component';

describe('InputFilePdfComponent', () => {
  let component: InputFilePdfComponent;
  let fixture: ComponentFixture<InputFilePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputFilePdfComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFilePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
