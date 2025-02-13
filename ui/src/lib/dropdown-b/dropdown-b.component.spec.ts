import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownBComponent } from './dropdown-b.component';

describe('DropdownBComponent', () => {
  let component: DropdownBComponent;
  let fixture: ComponentFixture<DropdownBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownBComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownBComponent);
    component = fixture.componentInstance;
    component.configs = {labelText: "", helpText: "", title: ""}
    fixture.detectChanges();
  });

  it('should create', () => {
    component.choseItem("title")
    component.ngOnChanges()
    expect(component).toBeTruthy();
  });

  it('should create title', () => {
    component.choseItem("title");
    expect(component.configs.title).toEqual("title");
  });

  it('should create titleObj', () => {
    component.lista = [{text:'title'}]
    component.choseItemObj({text:"title"});
    expect(component.configs.title).toEqual("title");
  });

  it('should onKeyUp', () => {
    component.lista = [{text:'title',check: false}]
    component.choseItemObjSelector({text:'title', check: false});
    expect(component.configs.title).toEqual("title");
  });

  it('should onInputChange', () => {
    component.lista = [{text:'title',check: false}]
    component.onInputChange();
    expect(component.arrayResultSearch[0].text).toEqual("title");
  });
});
