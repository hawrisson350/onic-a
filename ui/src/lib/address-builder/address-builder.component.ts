import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { IAddressFormData } from './interface/address-form-data.interface';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'terra-address-builder',
  templateUrl: './address-builder.component.html',
  styleUrls: ['./address-builder.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AddressBuilderComponent implements OnInit {
  @Input() direccionGuardada? = '';
  @Input() addressInit?: string =  "";
  @Output() finalAddress = new EventEmitter<string>();
  fb = new UntypedFormBuilder();
  addressForm!: UntypedFormGroup;
  nomenclaturasMasUsadas = [
    { elemento: 'Autopista', abreviatura: 'AU' },
    { elemento: 'Avenida', abreviatura: 'AV' },
    { elemento: 'Calle', abreviatura: 'CL' },
    { elemento: 'Carrera', abreviatura: 'CRA' },
    { elemento: 'Edificio', abreviatura: 'ED' },
    { elemento: 'Transversal', abreviatura: 'TV' },
    { elemento: 'Via', abreviatura: 'VI' },
  ];
  nomenclaturaSeleccionada = '';
  letras = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  referenciaCardinal: string[] = ['Norte', 'Sur', 'Oriente', 'Occidente'];
  direccionCodificada = '';
  readonly ONLY_NUMBERS = '^[0-9]+$';

  constructor(
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.openModal();
    if (this.direccionGuardada) {
      this.fillFormWithSavedAddress(this.direccionGuardada);
    }
  }

  initForm() {
   
    this.addressForm = this.fb.group({
      nombreCalleDireccion: ['', [Validators.required]],
      numeroPrincipalDireccion: [
        '',
        [Validators.required, Validators.pattern(this.ONLY_NUMBERS)],
      ],
      letraPrincipalDireccion: ['', []],
      letraPrincipalDireccion2: ['', []],
      bisPrincipalDireccion: ['', []],
      referenciaCardinalDireccion: ['', []],
      numeroSecundarioDireccion: ['', [Validators.required]],
      letraSecundariaDireccion: ['', []],
      numeroCasaDireccion: ['', [Validators.required]],
      referenciaCardinalDireccionSecundario: ['', []],
      complementoDireccion: ['', [Validators.maxLength(100)]],
      direccionCod: ['', []],
    });
    const removeExtraSpaces = (str: string) => {
      return str.trim().replace(/\s+/g, ' ');
    };

    this.addressForm.valueChanges
      .pipe(
        debounceTime(170),
        distinctUntilChanged(),
        map((val) => removeExtraSpaces(this.generarDireccionCodificada(val))),
        tap((direccionCodificada) => {
          const temp = this.addressForm.get('direccionCod')
          return temp?.patchValue(direccionCodificada)
        })
      )
      .subscribe();
  }

  generarDireccionCodificada(val: IAddressFormData): string {
    const {
      nombreCalleDireccion,
      numeroPrincipalDireccion,
      letraPrincipalDireccion,
      bisPrincipalDireccion,
      letraPrincipalDireccion2,
      referenciaCardinalDireccion,
      numeroSecundarioDireccion,
      letraSecundariaDireccion,
      numeroCasaDireccion,
      referenciaCardinalDireccionSecundario,
      complementoDireccion,
    } = val;
    return `${nombreCalleDireccion} ${numeroPrincipalDireccion} ${letraPrincipalDireccion} ${bisPrincipalDireccion} ${letraPrincipalDireccion2} ${referenciaCardinalDireccion} # ${numeroSecundarioDireccion} ${letraSecundariaDireccion} - ${numeroCasaDireccion} ${referenciaCardinalDireccionSecundario} ${complementoDireccion}`;
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  guardarDireccion(): void {
    
    if (this.addressForm.invalid) {            
      this.addressForm.markAllAsTouched();
      return; 
    }
    const add = this.addressForm?.get('direccionCod')
    if (add) this.finalAddress.emit(add.value);
    else this.finalAddress.emit('');
    let modalItems = document.getElementById("address");
    if (modalItems) modalItems.style.display = 'none';
  }

  cerrar(): void {
    this.finalAddress.emit(this.addressInit);
    let modalItems = document.getElementById("address");
    if (modalItems) modalItems.style.display = 'none';
  }

  openModal(): void {
    let modalItems = document.getElementById("address");
    if (modalItems) modalItems.style.display = 'block';
  }
  fillFormWithSavedAddress(address: string) {
    const formValues: Record<string, any> = {
      nombreCalleDireccion: this.getStreetName(address),
      numeroPrincipalDireccion: this.getMainNumber(address),
      letraPrincipalDireccion: this.getMainLetter(address),
      bisPrincipalDireccion: this.getBis(address),
      letraPrincipalDireccion2: this.getMainLetter2(address),
      referenciaCardinalDireccion: this.getCardinalReference(address),
      numeroSecundarioDireccion: this.getSecondaryNumber(address),
      letraSecundariaDireccion: this.getSecondaryLetter(address),
      numeroCasaDireccion: this.getHouseNumber(address),
      referenciaCardinalDireccionSecundario: this.getSecondaryCardinalReference(address),
      complementoDireccion: this.getComplement(address),
    };

    this.addressForm.patchValue(formValues);
  }

  getStreetName(address: string): string {
    const match = address.match(/^[^\d]+/);
    return match ? match[0].trim() : '';
  }

  getMainNumber(address: string): string {
    const match = address.match(/\d+/);
    return match ? match[0].trim() : '';
  }

  getMainLetter(address: string): string {
    const parts = address.split(' ');
    const letterIndex = parts.findIndex((part) => /^[a-zA-Z]$/.test(part));
    return letterIndex > -1 ? parts[letterIndex] : '';
  }

  getBis(address: string): string {
    const match = address.match(/Bis/);
    return match ? match[0].trim() : '';
  }

  getMainLetter2(address: string): string {
    const parts = address.split(' ');
    const letterIndex = parts.slice(4).findIndex((part) => /^[a-zA-Z]$/.test(part));
    return letterIndex > -1 ? parts[letterIndex + 4] : '';
  }

  getCardinalReference(address: string): string {
    const match = address.match(/(Norte|Oriente|Occidente|Sur)/);
    return match ? match[0].trim() : '';
  }

  getSecondaryNumber(address: string): string {
    const match = address.match(/\d+/g);
    return match && match[1] ? match[1] : '';
  }

  getSecondaryLetter(address: string): string {
    const parts = address.split(' ');
    const letterIndex = parts.slice(6).findIndex((part) => /^[a-zA-Z]$/.test(part));
    return letterIndex > -1 ? parts[letterIndex + 6] : '';
  }

  getHouseNumber(address: string): string {
    const parts = address.split('-');
    if (parts[1]) {
      const houseAndComplement = parts[1].trim().split(' ');
      return houseAndComplement[0];
    }
    return '';
  }

  getSecondaryCardinalReference(address: string): string {
    const parts = address.split(' ');
    const cardinalIndex = parts.slice(9).findIndex((part) => /(Norte|Oriente|Occidente|Sur)/.test(part));
    return cardinalIndex > -1 ? parts[cardinalIndex + 9] : '';
  }

  getComplement(address: string): string {
    const parts = address.split('-');
    if (parts[1]) {
      const houseAndComplement = parts[1].trim().split(' ');
      // Eliminar el número de casa
      houseAndComplement.shift();

      // Comprobar si la siguiente parte es una referencia cardinal secundaria y, de ser así, eliminarla
      if (/(Norte|Oriente|Occidente|Sur)/.test(houseAndComplement[0])) {
        houseAndComplement.shift();
      }

      return houseAndComplement.join(' ');
    }
    return '';
  }
    //Para etiqueta de campo requerido
    formField(fieldName: string): FormControl {
      return this.addressForm?.get(fieldName) as FormControl;
    }
}

