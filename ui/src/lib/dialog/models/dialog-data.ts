import { TemplateRef } from "@angular/core";
import { DialogType } from "./dialog-type";

export class DialogData {
    type: DialogType = DialogType.success;
    title?: string;
    subtitle?: string;    
    body?: string;
    buttonClose?: boolean = true;
    buttonCancel?: boolean = true;
    buttonConfirm?: boolean = true;
    textButtonCancel?: string = "Cancelar"
    textButtonConfirm?: string = "Aceptar"
    isProcessing = false;
    template?: TemplateRef<any>;
    
    get isOneButton() {
      return !(this.buttonCancel && this.buttonConfirm)
    }
    
    
    get classNameIcon(): string {
      if (this.type === DialogType.warning) {
        return 'modal-warning-icon';
      }
      if (this.type === DialogType.info) {
        return 'modal-confirmation-icon';
      }
      if (this.type === DialogType.danger) {
        return 'modal-error-icon';
      }
      return 'modal-success-icon';
    }

    get classNameText(): string {
      if (this.type === DialogType.warning) {
        return 'warning-govco';
      }
      if (this.type === DialogType.info) {
        return 'confirmation-govco';
      }
      if (this.type === DialogType.danger) {
        return 'error-govco';
      }
      return 'success-govco';
    }
  }
  