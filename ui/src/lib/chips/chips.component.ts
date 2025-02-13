import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'terra-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})


export class ChipsComponent implements OnInit {
  @Input() chipStyle: string = "";
  @ContentChild('header', { static: false }) headerTemplateRef: TemplateRef<any> | undefined;
  @ContentChild('body', { static: false }) bodyTemplateRef: TemplateRef<any> | undefined;
  @Input() arrayChipsSelector?: Array<any>;
  @Input() arrayNameSelector?: string;
  @Input() arrayChips?: Array<string>;
  @Output() emitArrayChips = new EventEmitter();
  @Output() emitStringChips = new EventEmitter();
  checkArrayEmpty = false;
  visible: boolean = true;
  constructor() {

  }

  onclick(index: number) {
    if (this.arrayChips != undefined) {
      this.emitArrayChips.emit({value: this.arrayChips[index], arrayName: this.arrayNameSelector} );
      this.emitStringChips.emit({ value: this.arrayChips[index], arrayName: this.arrayNameSelector })
      this.arrayChips?.splice(index, 1);
    }
  }

  onclickSelector(index: number) {
    if (this.arrayChipsSelector != undefined) {
      this.emitArrayChips.emit(this.arrayChipsSelector[index]);
      this.arrayChipsSelector?.splice(index, 1);
    }
  }


  ngOnInit(): void {
    this.visible = true;
  }

}

