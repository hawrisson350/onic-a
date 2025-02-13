import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinderCardComponent } from './finder-card.component';

describe('FinderCardComponent', () => {
  let component: FinderCardComponent;
  let fixture: ComponentFixture<FinderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinderCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FinderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('arrays ok', () => {
    component.buttonSearch({})
    expect(component.arraySearch).toEqual([])

    component.arrayInit = [{ valorFiltro: 'xy' }]
    component.boxSearch('x')
    expect(component.searchText).toEqual('x');

    component.clean()
    expect(component.arraySearch).toEqual([{"valorFiltro": "xy"}])

    component.arraySelectCheck = ['yy']
    component.selectCheckBox('yy')
    expect(component.arrayResultSearch).toEqual([{"valorFiltro": "xy"}])

    component.arraySelectCheck = ['a']
    component.selectCheckBox('yy')
    expect(component.arrayResultSearch).toEqual([{"valorFiltro": "xy"}])
  });
});
