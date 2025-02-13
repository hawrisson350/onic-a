import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IModalItem, IModalItemDoc } from './interface/modal-interface';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'terra-blank-modal',
  templateUrl: './blank-modal.component.html',
  styleUrls: ['./blank-modal.component.css'],
  imports: [CommonModule,FormsModule ,ReactiveFormsModule],
})
export class BlankModalComponent implements OnInit {
  @Output() modalResponse = new EventEmitter();
  @Output() modalResponseObject = new EventEmitter();
  @Output() modalResponseOptionText = new EventEmitter();
  @Output() ScrollAlFinal = new EventEmitter();
  @Input() modalItem?: IModalItem;
  @Input() modalItemDoc?: any;
  @Input() downText: string = "";
  @Input() cargaDocConfig: any;
  @Input() visible: boolean =  false;
  @Input() ScrollBlock: boolean =  false;
  @Input() subtitle: string =  "";
  @Output() response = new EventEmitter();
  //@ViewChild('Contenido') property:ElementRef

  htmlFormat: any;
  modalType: String = this.modalItem?.type || "";
  contenido: string = "";
  doc:any=null;
  
  
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if(this.modalItem){
      this.modalType = this.modalItem?.type || ""
      this.htmlFormat = this.sanitizer.bypassSecurityTrustHtml(String(this.modalItem?.description))
      if (!this.visible) {
        this.openModal();
      } 
    }else if(this.modalItemDoc){
      this.modalType = this.modalItemDoc?.type || ""
      this.htmlFormat = this.sanitizer.bypassSecurityTrustHtml(String(this.modalItemDoc?.description))
      if (!this.visible) {
        this.openModalDoc();
      } 
    }
  
  }
  async closeModal(option: string, modalItem: any, textOption: any, response?: any) {
    let modalItems = document.getElementById(this.modalItem?.type || "");
    if (modalItems) modalItems.style.display = 'none';
    this.modalResponse.emit(option);
    this.modalResponseOptionText.emit({option, textOption, title: modalItem.title});
    this.modalResponseObject.emit({ option, modalItem }); 
    this.response.emit({response: response, option: option});
  }
  async closeModalDoc(option: string,comentario?: any,information?:any) {
    let modalItems = document.getElementById(this.modalItemDoc?.type || "");
    if (modalItems) modalItems.style.display = 'none';
    if(this.doc!=null && option=='Right'){
      console.log(JSON.stringify(information)+"information antes de emitir")
      const doc={
        doc:this.doc,
        comentario:comentario,
        information:information
      }
      this.response.emit({response: doc, option: option});
      this.limpiarVariables();
    }else{
      this.modalResponse.emit(option);
      this.limpiarVariables();
    }
    
  }
  limpiarVariables(){
    this.doc=null;
    this.contenido='';
    this.modalItemDoc=undefined;
  }
  openModal(): void {
    let modalItems = document.getElementById(this.modalItem?.type || "");
    if (modalItems) modalItems.style.display = 'block';
  }
  openModalDoc(): void {
    let modalItems = document.getElementById(this.modalItemDoc?.type || "");
    if (modalItems) modalItems.style.display = 'block';
  }
  onKeyPress(event: KeyboardEvent) {
    const charCode = event.charCode;
    if ((charCode >= 48 && charCode <= 57) || // 0-9
        (charCode >= 65 && charCode <= 90) || // A-Z
        (charCode >= 97 && charCode <= 122) || // a-z
        charCode === 32) { // Space
      return true;
    }    
    event.preventDefault();
    return false;
  }
  onPaste(event: ClipboardEvent): void {
    // Evitar la acción de pegar
    event.preventDefault();
  } 
  scrollFin = false;
  checkScroll(event: any) {
    const bottom = event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight-10;
    if (bottom) {
      this.scrollFin = true;
    } else {
      this.scrollFin = false;
    }
    this.ScrollAlFinal.emit(this.scrollFin);
  }
  docAssignFile(event: any){
    this.doc=event;

  }
  docAssignFileDelete(event: any){
    this.doc = null;
  }
}
