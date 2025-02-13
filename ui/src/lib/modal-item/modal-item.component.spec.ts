import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemComponent } from './modal-item.component';

describe('ModalItemComponent', () => {
  let component: ModalItemComponent;
  let fixture: ComponentFixture<ModalItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const keyEvent = new KeyboardEvent('keydown', { code: 'Digit0' });
    component.onKeyDownHandler(keyEvent);
    expect(component).toBeTruthy();
  });

  it('modal close', async () => {
    const keyEvent = new KeyboardEvent('keydown', { code: 'Escape' });
    component.onKeyDownHandler(keyEvent);
    const modalItem = {
      title: "",
      subTitle: "",
      description: "",
      buttonLeft: "",
      buttonRight: "",
      type: "",
    }
    component.closeModal("Left", modalItem, '');
    expect(component.modalResponse.emit.length).toEqual(1)
    component.modalItem = {
      title: "",
      description: "",
      subTitle: "",
      buttonLeft: "",
      buttonRight: "",
      type: "confirmation"
    }
    component.closeModal("Close", {}, '')
  });
  it('modal open', () => {
    component.modalItem = {
      title: "",
      description: "",
      subTitle: "",
      buttonLeft: "",
      buttonRight: "",
      type: "confirmation"
    }
    component.openModal();
    expect(component.modalItem.type).toEqual("confirmation")
  });
});
