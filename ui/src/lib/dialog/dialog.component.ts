import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DialogData } from './models/dialog-data';
import { ActionType } from './models/action-type.enum';

@Component({
  selector: 'terra-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit, OnDestroy {
  constructor() { 
    /* This constructor is empty */     
  }
  
  @Input() dialogData: DialogData = new DialogData();
  @Output() eventAction = new EventEmitter<ActionType>();
  ngOnInit(): void {
    console.log('Modal init');
  }

  close() {
    this.eventAction.emit(ActionType.close);
  }
  cancel() {
    this.eventAction.emit(ActionType.cancel);
  }
  confirm() {
    this.eventAction.emit(ActionType.confirm);
  }
  ngOnDestroy(): void {
    console.log(' Modal destroyed');
  }
}
