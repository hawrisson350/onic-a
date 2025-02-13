import { CommonModule } from '@angular/common';
import { Component, Input, Output, OnInit, EventEmitter, AfterViewInit, SimpleChanges, HostListener } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'terra-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class DropdownListComponent implements OnInit, AfterViewInit {
  @Input() lista!: any[];
  @Input() labelText = '';
  @Input() idList = '';
  @Input() type = '';
  @Input() update = false;
  @Input() disabled = false;
  @Input() isClear = false;
  @Input() value = '';
  @Input() note = '';
  @Input() isRequired = false;
  @Output() eventlist = new EventEmitter<any>();

  @HostListener("click")
  clicked() {
    this.inside = true;
  }

  @HostListener("document:click")
  clickedOut() {
    if (!this.inside) {
      this.seelist = false;
    }
    this.inside = false;    
  }

  filter = false;
  basic = false;
  multiple = false
  seelist: boolean = false;
  title: string = "Escoger"
  inside: boolean =false
  selectOption: string ='desplegable-selected-option';
  selectOptionRequired: string ='desplegable-selected-option error-desplegable-govco';

  constructor() { }

  ngOnInit(): void {        
    this.getTipo(); 
  }

  ngOnChanges(changes: SimpleChanges) {    

    if (changes['isClear']?.currentValue || changes['value']?.currentValue === "") {
        this.title = 'Escoger'
    }


  }
  reiniciarTitulo(){
    this.title = 'Escoger'
  }
  ngAfterViewInit(): void {
    if (this.basic == true) {
      const varAux = 'lista-desplegables' + this.idList;
      let sel = document.getElementById('' + varAux)
      sel?.addEventListener<any>("click", (e) => {
        this.getVal(e)
      })
    }
    if (this.filter == true) {
      const varAux = 'lista-filtro-busqueda' + this.idList;
      let sel = document.getElementById('' + varAux)
      sel?.addEventListener<any>("click", (e) => {
        this.getVal(e)
      })
    }
    if (this.multiple == true) {
      const varAux = 'lista-check' + this.idList;
      let sel = document.getElementById('' + varAux)
      sel?.addEventListener<any>("click", (e) => {
        this.getVal(e)
      })
    }
  }

  getVal(e: any): void {
    this.update = false;
    this.title = e.text;
    this.seelist = false;
    this.isRequired = false;
    this.eventlist.emit(e);
  }

  getTipo(): void {
    if (this.type == 'filter') {
      this.filter = true;
    }
    if (this.type == 'basic') {
      this.basic = true;
    }
    if (this.type == 'multiple') {
      this.multiple = true;
    }
  }

  seeList() {    
    this.seelist = !this.seelist;
  }
}
