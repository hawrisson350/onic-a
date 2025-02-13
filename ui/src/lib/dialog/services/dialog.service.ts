import { ComponentRef, EventEmitter, Injectable, ViewContainerRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogComponent } from '../dialog.component';
import { DialogAction } from '../models/dialog-action';
import { DialogData } from '../models/dialog-data';
import { ActionType } from '../models/action-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private componentRef!: ComponentRef<DialogComponent>;
  private componentSubscriber!: Subject<DialogAction>;
  public eventClose = new EventEmitter();
  public eventError = new EventEmitter<string>();
  public eventProcessing = new EventEmitter<boolean>();
  private dialogResponse!: DialogAction;

  constructor() { 
    /* This constructor is empty */     
  }

  openModal(entry: ViewContainerRef, dialogData: DialogData) {
    this.componentRef = entry.createComponent(DialogComponent);
    this.componentRef.instance.dialogData = dialogData;
    this.componentRef.instance.eventAction.subscribe((actionType: ActionType) => this.resultActionModal(actionType));
    this.componentSubscriber = new Subject<DialogAction>();
    this.dialogResponse = new DialogAction();
    this.dialogResponse.eventClose = this.eventClose;
    this.dialogResponse.eventError = this.eventError;
    this.dialogResponse.eventProcessing = this.eventProcessing;
    
    this.eventClose.subscribe({
      next: (() => {
        this.closeModal();     
      }),
      error: ((error: any) => {
        console.error(error);
      })
    });

    this.eventError.subscribe({
      next: ((error: any) => {
        console.error(error);
      }),
      error: ((error: any) => {
        console.error(error);
      })
    });

    this.eventProcessing.subscribe({
      next: ((isProcessing: boolean) => {
        dialogData.isProcessing = isProcessing;
      }),
    });

    return this.componentSubscriber.asObservable();
  }

  resultActionModal(actionType: ActionType) {
    this.dialogResponse.action = actionType;
    this.componentSubscriber.next(this.dialogResponse);
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }
}