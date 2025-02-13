import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'terra-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css'],
  imports: [CommonModule,FormsModule ,ReactiveFormsModule],
})
export class CheckBoxComponent implements OnInit{
  @Input() arrayCheckBoxes?: any = {};

  @Output() selectedCheckboxes = new EventEmitter<any[]>();

  ngOnInit(): void {
    // Emitir los checkboxes seleccionados al iniciar si ya hay seleccionados.
    this.emitSelectedCheckboxes();
  }

  toggleCheck(row: any) {
    // Cambia el estado de 'checked' al hacer clic en el checkbox
    row.checked = !row.checked;
    this.emitSelectedCheckboxes();
  }

  emitSelectedCheckboxes() {
    // Filtrar los checkboxes seleccionados y emitirlos
    const selected = this.arrayCheckBoxes.data.filter((row: any) => row.checked);
    this.selectedCheckboxes.emit(selected);
  }
}
