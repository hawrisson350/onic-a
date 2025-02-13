import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Modal } from '../modal/interface/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ModalInterface {
  btnFillText: string;
  btnOutlineText: string;
  typeAlertModal: string;
  title: string;
  detail: string;
  btnFillFlag: string;
  btnOutlineFlag: string;
  btnBackdropEscFlag: string;
  btnCloseFlag: string;
  btnFillSee: boolean;
  btnOutlineSee: boolean;
}


@Component({
  selector: 'terra-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ModalComponent {

  @HostListener('keydown.esc', ['$event'])
  onEsc(event: KeyboardEvent) {
    this.btnCloseEventEmit.emit(this.modalConfig.btnBackdropEscFlag);
  }

  @HostListener("click")
  clicked() {
    if (!this.inside) {
      this.btnCloseEventEmit.emit(this.modalConfig.btnBackdropEscFlag);
    }
    this.inside = false;
  }

  @Input() idModal = '';
  @Input() modalConfig: ModalInterface = new Modal()
  @Output() btnFillEventEmit = new EventEmitter<string>();
  @Output() btnOutlineEventEmit = new EventEmitter<string>();
  @Output() btnCloseEventEmit = new EventEmitter<string>();


  inside = false;

  btnFillClick() {
    this.btnFillEventEmit.emit(this.modalConfig.btnFillFlag);
  }

  btnOutlineClick() {
    this.btnOutlineEventEmit.emit(this.modalConfig.btnOutlineFlag);
  }

  btnCloseClick(){
    this.btnCloseEventEmit.emit(this.modalConfig.btnCloseFlag);
  }

  onclickInside(){
    this.inside = true;
  }
}
