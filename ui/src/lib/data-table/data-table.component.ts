import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'terra-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  imports: [CommonModule, FormsModule ,ReactiveFormsModule],
})
export class DataTableComponent implements OnInit  {
  @Input() table: any = {};
  @Input() rows: any[] = [];
  @Output() rowSelected: EventEmitter<any>;
  @Output() clickSelected = new EventEmitter();
  @Output() clickSelectedColumn = new EventEmitter<any>();
  @Input() scrollBar = false;
  @Input() documentTable = false;

  constructor() {
    this.rowSelected = new EventEmitter();
  }


  ngOnChanges(changes: SimpleChanges) {
    //console.log(changes);
  }

  ngOnInit(): void {
    if (this.table.columns.filter((fil: any) => fil.type == 'check').length > 0) {
      this.rows.map((map) => map.selected = false)
    };
  }

  optionReturn(row: any, idCargue: number, state:any, periodo:number, idUsuario:number){
    console.log(idUsuario, "llega usuaruo");
    console.log(periodo, "periodo");
    row["idUsuario"] = idUsuario;
    row["idPeriodo"] = periodo;
    row["estadoUsuario"] = state;
    row["idCargue"] = idCargue;
    this.clickSelected.emit(row);
  }
  /**
   *
   * @param row Objeto seleccionado median click en la fila
   */
  returnRow(row: any, column: any) {
    row.selected = !row.selected;
    let unidos = Object.assign(row, column);
    this.rowSelected.emit(unidos);
  }

  returnSelectedColumn(th: any){
    this.clickSelectedColumn.emit(th);
  }
}
