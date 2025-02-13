import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUserOptionComponent } from './card-user-option.component';

describe('CardUserOptionComponent', () => {
  let component: CardUserOptionComponent;
  let fixture: ComponentFixture<CardUserOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardUserOptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardUserOptionComponent);
    component = fixture.componentInstance;
    component.data = {parentName: '', childProperties:[{propertyName:''}]}
    fixture.detectChanges();
  });

  it('should create', () => {
    component.choseItemObj({})
    expect(component).toBeTruthy();
  });
});
