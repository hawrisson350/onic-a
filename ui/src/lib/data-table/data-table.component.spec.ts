import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.table = {
      columns: [
        {
          def: "periodo",
          value: "Período",
          type: "check",
        }
      ],
    }
    component.rows = [{
      periodo: `x`
    }]
    fixture.detectChanges();
  });

  it('should create', async () => {
    component.optionReturn({});
    component.returnRow({},{});
    expect(component).toBeTruthy();
  });
});
