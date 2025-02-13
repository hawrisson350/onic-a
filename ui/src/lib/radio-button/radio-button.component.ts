import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'terra-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class RadioButtonComponent implements OnChanges{
  @Input() arrayRadioButtons?: any = {};
  @Input() clearSelection?: boolean;
  @Output() isRadioSelect = new EventEmitter();

  ngOnInit(): void {
    const objCheck = this.arrayRadioButtons.data.find((row: any) => row.check);
    if (objCheck) this.selectCheck(objCheck)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clearSelection'] && changes['clearSelection'].currentValue === true) {
      this.clearAllSelections();
    }
  }

  clearAllSelections() {
    this.arrayRadioButtons.data.forEach((row: any) => {
      row.check = false;
    });

    this.isRadioSelect.emit(null);
  }

  selectCheck(row: any) {
    this.arrayRadioButtons.data.forEach((row: any) => {
      row.check = false;
    });
  
    row.check = true;
  
    this.isRadioSelect.emit(row);
  }
}
