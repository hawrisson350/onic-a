import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChunksProgressComponent } from './chunks-progress.component';

describe('ChunksProgressComponent', () => {
  let component: ChunksProgressComponent;
  let fixture: ComponentFixture<ChunksProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChunksProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChunksProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
