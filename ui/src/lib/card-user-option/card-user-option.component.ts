import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'terra-card-user-option',
  templateUrl: './card-user-option.component.html',
  styleUrls: ['./card-user-option.component.css'],
  imports: [CommonModule],

})
export class CardUserOptionComponent {

  @Input() data!: any;
  @Output() clickElementObj = new EventEmitter<any>();

  choseItemObj(optionObj: any) {
    this.clickElementObj.emit(optionObj);
  }
}
