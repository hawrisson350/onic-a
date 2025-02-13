import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvanceLineComponent } from './advance-line.component';

describe('AdvanceLineComponent', () => {
  let component: AdvanceLineComponent;
  let fixture: ComponentFixture<AdvanceLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvanceLineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvanceLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
