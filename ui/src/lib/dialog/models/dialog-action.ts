import { EventEmitter } from "@angular/core";
import { ActionType } from "./action-type.enum";

export class DialogAction {
    action: ActionType = ActionType.confirm;
    public eventClose = new EventEmitter();
    public eventError = new EventEmitter<any>();
    public eventProcessing = new EventEmitter<boolean>();
  }