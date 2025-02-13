import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'terra-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  animations: [
    trigger('smoothCollapse',[
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
        visibility: 'hidden'
      })),
      state('final', style({
        overflow: 'hidden'
      })),
      transition('initial<=>final', animate('250ms'))
    ]),
    trigger('rotatedStateOpen',[
      state('default', style({transform: 'rotate(0)'})),
      state('rotated', style({transform: 'rotate(180deg)'})),
      transition('default <=> rotated', animate('250ms'))
    ]),
    trigger('rotatedStateClose',[
      state('default', style({transform: 'rotate(0)'})),
      state('rotated', style({transform: 'rotate(-180deg)'})),
      transition('default <=> rotated', animate('250ms'))
    ]),
  ]
})
export class AccordionComponent implements OnInit, OnChanges {
  @Input() accordionStyle: string = "";
  @Input() arrayLabel: Array<any> = [];
  @Input() accordionButtonTitle: string = "";
  @Input() accordionNumber: string = "";
  @Input() activate: string = "";
  @Output() closeOtherPanels: EventEmitter<string> = new EventEmitter();
  active : boolean = false;
  showBody = false;
  constructor() { }

  
  ngOnChanges(changes : SimpleChanges){
    if(changes?.['activate']){
      this.active = this.activate == this.accordionButtonTitle;
    }
  }
  
    toggleDinamic() {
      this.active = !this.active;
      if(this.active){
        this.closeOtherPanels.emit(this.accordionButtonTitle);
      }
    }

  ngOnInit(): void {

  }

  toggle(){
    this.showBody = !this.showBody;
  }
}
