interface ModalInterface {
    btnFillText?: string;
    btnOutlineText?: string;
    typeAlertModal?: string;
    title?: string;
    detail?: string;
    btnFillFlag?: string;
    btnOutlineFlag?: string;
    btnBackdropEscFlag?: string;
    btnCloseFlag?: string;
    btnFillSee?: boolean;
    btnOutlineSee?: boolean;
}

export class Modal {
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

    constructor() {
        this.btnFillText = 'Aceptar';
        this.btnOutlineText = 'Cancelar';
        this.typeAlertModal = 'success';
        this.title = '';
        this.detail = '';
        this.btnFillFlag = '';
        this.btnOutlineFlag = '';
        this.btnBackdropEscFlag = '';
        this.btnCloseFlag = '';
        this.btnFillSee = true;
        this.btnOutlineSee = true;
    }

    setValueAlert(dataModal: ModalInterface) {
        this.typeAlertModal = dataModal.typeAlertModal ? dataModal.typeAlertModal : 'success'
        this.title = dataModal.title ? dataModal.title : ''
        this.detail = dataModal.detail ? dataModal.detail : ''
        this.btnFillFlag = dataModal.btnFillFlag ? dataModal.btnFillFlag : 'here'
        this.btnOutlineFlag = dataModal.btnOutlineFlag ? dataModal.btnOutlineFlag : 'here'
        this.btnCloseFlag = dataModal.btnCloseFlag ? dataModal.btnCloseFlag : 'here'
        this.btnBackdropEscFlag = dataModal.btnBackdropEscFlag ? dataModal.btnBackdropEscFlag : 'here'
        this.btnFillSee = dataModal.btnFillSee !== undefined ? dataModal.btnFillSee : true
        this.btnOutlineSee = dataModal.btnOutlineSee !== undefined ? dataModal.btnOutlineSee : true
        this.btnFillText = dataModal.btnFillText ? dataModal.btnFillText : 'Aceptar'
        this.btnOutlineText = dataModal.btnOutlineText ? dataModal.btnOutlineText : 'Cancelar'
    }

}
