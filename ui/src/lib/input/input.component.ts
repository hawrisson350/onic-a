
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnChanges, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { VALIDATION_REGEX_MAP, ValidationType } from '../constants/validation.utils';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'terra-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, OnChanges{
  @Input() control!: FormControl;
  @Input() type = 'text';
  @Input() label = '';
  @Input() placeholder = '';

  @Input() note = '';
  @Input() textSuccess = '';
  @Input() showStatus = true;

  @Input() showCounter = false;
  @Input() maxLength: number | null = null;
  @Input() minLength: number | null = null;

  @Input() max: number | undefined | null = null;
  @Input() min: number | undefined | null = null;

  @Input() disabled = false;
  @Input() required = false;
  auxExpresionRegular: RegExp | null = null;
  @Input() showCurrencyFormat = false;
  @Input() isReadOnly = false;
  @Input() confirmPasswordControl!: FormControl;
  @Input() confirmPolicy!: boolean;
  @Input() typeValidation: ValidationType = 'any' ;
  @Input() inputPattern: string | null = null; 
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onInput = new EventEmitter<any>();
  @Output() onkeypress = new EventEmitter<KeyboardEvent>();
  @Output() onpaste = new EventEmitter<ClipboardEvent>(); 
  @Output() ondrop = new EventEmitter<DragEvent>(); 

  
  @ViewChild('inputRef') inputRef!: ElementRef;
  @ViewChild('hidePasswordButton') hidePasswordButton!: ElementRef;
  @ViewChild('showPasswordButton') showPasswordButton!: ElementRef;

  ngOnInit(): void {
    this.auxExpresionRegular = VALIDATION_REGEX_MAP[this.typeValidation] || null;
  }

  ngOnChanges() {
    this.setControlState();
  }

  onInputEvent(event: any) {
    if (this.inputPattern) {
      const pattern = new RegExp(this.inputPattern, 'g');
      const inputElement = event.target as HTMLInputElement;
      inputElement.value = inputElement.value.replace(pattern, '');
      this.control.setValue(inputElement.value);
    }
    
    this.onInput.emit(event.target.value);
  }

  onKeyPressEvent(event: KeyboardEvent): void {
    this.onkeypress.emit(event);
  }

  onPasteEvent(event: ClipboardEvent): void {
    this.onpaste.emit(event);
  }

  onDropEvent(event: DragEvent): void {
    this.ondrop.emit(event);
  }

  get isControlValid() {
    if (this.control !== null) {
      return this.control.touched && this.control.valid;
    }
    return false
  }
  get isControlInvalid() {
    let confirmPass = false;
    let confirmPolicyPass = false;
    if (this.control !== null) {
      const isInvalid = this.control.touched && this.control.invalid;
      if(this.confirmPolicy !== undefined && !this.confirmPolicy && this.control.value !== ""){
        confirmPolicyPass = true;
      }
      if(this.confirmPasswordControl !== undefined && this.control.value !== ""){
        confirmPass = this.confirmPasswordControl &&
        this.confirmPasswordControl.touched &&
        this.control.value !== this.confirmPasswordControl.value;
        
      }
      return isInvalid || confirmPass || confirmPolicyPass;
    }
    return false;
  }

  setControlState() {
    if (this.disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
  
  onKey(event: any) {
    if (this.auxExpresionRegular !== null) {
      const auxValidate: string[] = [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'Backspace',
        'Delete',
        'Tab',
      ];

      if (!auxValidate.includes(event.key)) {
        if (!this.auxExpresionRegular?.test(event.key)) return false;
        else return true;
      }
      return true;
    }
    return true;
  }

  showPassword() {

    this.hidePasswordButton.nativeElement.style.display = 'block';
    this.showPasswordButton.nativeElement.style.display = 'none';
    
    if (this.inputRef.nativeElement.type === 'text') {
      setTimeout(() => {
        this.inputRef.nativeElement.type = 'password';
      }, );
    }

  }

  hidePassword() {

    this.showPasswordButton.nativeElement.style.display = 'block';
    this.hidePasswordButton.nativeElement.style.display = 'none';
    
    if (this.inputRef.nativeElement.type === 'password') {
      setTimeout(() => {
        this.inputRef.nativeElement.type = 'text';
      }, );
      
    }

  }
}
