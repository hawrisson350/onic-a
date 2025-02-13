import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { IModalItem } from './interface/modal-interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'terra-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ModalItemComponent implements OnInit {

  @Output() modalResponse = new EventEmitter();
  @Output() modalResponseObject = new EventEmitter();
  @Output() modalResponseOptionText = new EventEmitter();
  @Input() modalItem?: IModalItem;
  @Input() visible: boolean = false;
  @Input() progress: boolean = true;
  leftButton = true;
  rightButton = true;

  modalType: String = this.modalItem?.type || ""
  constructor() { }

  ngOnInit(): void {

    this.modalType = this.modalItem?.type || ""
    this.openModal();
    if (this.modalItem?.buttonLeft == '') {

    }
  }
  async closeModal(option: string, modalItem: any, textOption: any) {
    let modalItems = document.getElementById(this.modalItem?.type || "");
    if (modalItems) modalItems.style.display = 'none';
    this.modalResponse.emit(option);
    this.modalResponseObject.emit({ option, modalItem });
    this.modalResponseOptionText.emit({ option, textOption, title: modalItem.title });
  }
  async closeModalSpinner() {
    console.log("ENTRO AL CLOSE SPIENNER")
    let modalItems = document.getElementById(this.modalItem?.type || "");
    if (modalItems) modalItems.style.display = 'none';
    //this.modalResponseOptionText.emit({option, textOption, title: this.modalItem?.title});
  }
  openModal(): void {
    let modalItems = document.getElementById(this.modalItem?.type || "");
    if (modalItems) modalItems.style.display = 'block';
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.closeModal('Close', this.modalType, '')
    }
  }
}
