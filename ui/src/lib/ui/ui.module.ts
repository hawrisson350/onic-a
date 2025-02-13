import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ModalItemComponent } from '../modal-item/modal-item.component';
import { ModalComponent } from '../modal/modal.component';
import { ButtonComponent } from '../button/button.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { DropdownBComponent } from '../dropdown-b/dropdown-b.component';
import { FooterComponent } from '../footer/footer.component';
import { FileInputComponent } from '../file-input/file-input.component';
import { InputFileComponent } from '../input-file/input-file.component';
import { BlankModalComponent } from '../blank-modal/blank-modal.component';
import { AccordionComponent } from '../accordion/accordion.component';
import { ScrollBarComponent } from '../scroll-bar/scroll-bar.component';
import { FinderCardComponent } from '../finder-card/finder-card.component';
import { ChipsComponent } from '../chips/chips.component';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { CardUserOptionComponent } from '../card-user-option/card-user-option.component';
import { AddressBuilderComponent } from '../address-builder/address-builder.component';
import { FieldErrorsDireccionComponent } from '../components/field-errors-direccion/field-errors-direccion.component';
import { DialogComponent } from '../dialog/dialog.component';
import { DropdownListComponent } from '../dropdown-list/dropdown-list.component';
import { InputFilePdfComponent } from '../input-filePdf/input-file-pdf.component';
import { AdvanceLineComponent } from '../advance-line/advance-line.component';
import { PasswordStrengthComponent } from '../password-strength/password-strength.component';
import { InputMultipleFilePdfComponent } from '../input-multiple-file-pdf/input-multiple-file-pdf.component';
import { InputComponent } from '../input/input.component';
import { ChunksProgressComponent } from '../chunks-progress/chunks-progress.component';
import { CheckBoxComponent } from '../check-box/check-box.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ModalItemComponent,
    ModalComponent,
    ButtonComponent,
    DataTableComponent,
    DropdownBComponent,
    FooterComponent,
    FileInputComponent,
    InputFileComponent,
    BlankModalComponent,
    PaginatorComponent,
    AccordionComponent,
    ScrollBarComponent,
    FinderCardComponent,
    ChipsComponent,
    RadioButtonComponent,
    CardUserOptionComponent,
    AddressBuilderComponent,
    FieldErrorsDireccionComponent,
    DialogComponent,
    DropdownListComponent,
    InputFilePdfComponent,
    AdvanceLineComponent,
    PasswordStrengthComponent,
    InputMultipleFilePdfComponent,
    InputComponent,
    ChunksProgressComponent,
    CheckBoxComponent,
  ],
  exports: [
    CommonModule,
    ModalItemComponent,
    ModalComponent,
    ButtonComponent,
    DataTableComponent,
    DropdownBComponent,
    FooterComponent,
    FileInputComponent,
    InputFileComponent,
    BlankModalComponent,
    PaginatorComponent,
    AccordionComponent,
    ScrollBarComponent,
    FinderCardComponent,
    ChipsComponent,
    RadioButtonComponent,
    CardUserOptionComponent,
    AddressBuilderComponent,
    FieldErrorsDireccionComponent,
    DialogComponent,
    DropdownListComponent,
    InputFilePdfComponent,
    AdvanceLineComponent,
    PasswordStrengthComponent,
    InputMultipleFilePdfComponent,
    InputComponent,
    ChunksProgressComponent,
    CheckBoxComponent,
  ]
})
export class UiModule { }
