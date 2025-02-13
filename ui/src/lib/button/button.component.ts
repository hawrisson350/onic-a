import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'terra-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],

})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() buttonStyle: string = '';
  @Input() enabled: boolean = false;
  @Output() clickSelected = new EventEmitter();
  constructor() { }
  ngOnInit(): void { }
}
