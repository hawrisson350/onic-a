import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'gestion-field-errors-direccion',
  templateUrl: './field-errors-direccion.component.html',
  styleUrls: ['./field-errors-direccion.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class FieldErrorsDireccionComponent {

  @Input() public formField!: FormControl;

  getName(formField: FormControl): string | null {
    return Object.entries(formField.parent?.controls ?? []).find(([_, value]) => value === formField)?.[0] ?? null;
  }
}
