import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'terra-finder-card',
  templateUrl: './finder-card.component.html',
  styleUrls: ['./finder-card.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class FinderCardComponent {
  @Input() arrayInit?: Array<any>;

  @Output() isItemsSelect = new EventEmitter();
  @ViewChild('myId') myDynamicIdElementRef: ElementRef | undefined;
  @HostBinding('attr.id') myId;

  searchText: string = '';
  arrayResultSearch: Array<any> = [];
  arraySearch: Array<any> = [];
  arraySelectCheck: Array<any> = [];

  ngOnInit(): void {
    this.arrayResultSearch = this.arrayInit || [];
    this.arraySearch = this.arrayInit || [];
  }

  constructor(private elRef: ElementRef){
  this.myId = `my-dynamic-id-${this.elRef.nativeElement.tagName.toLowerCase()}-${Math.floor(Math.random() * 10000)}`;
    
  }

  buttonSearch(event: any) {
    this.arraySearch = this.arrayResultSearch || [];
    let resultSearch = this.arrayInit?.filter((element) => element.valorFiltro.includes(event));
    this.arrayResultSearch = resultSearch || [];
    let cu = document.querySelector('#barSearch')
    cu?.setAttribute('class', 'bar-search-govco')
    this.searchText = event;
  }

  boxSearch(event: any) {
  
    this.searchText = event;
    let resultSearch = this.arrayInit?.filter((element) => element.valorFiltro.includes(event))
    this.arraySearch = resultSearch || [];
  }

  clean() {
    this.arraySearch = this.arrayInit || [];
  }

  selectCheckBox(event: any) {
    this.arrayResultSearch = this.arrayInit || [];
    let verifyExist = this.arraySelectCheck.findIndex(select => event === select);

    if (verifyExist === -1) this.arraySelectCheck.push(event);
    if (verifyExist !== -1) this.arraySelectCheck.splice(verifyExist, 1);

    this.isItemsSelect.emit(this.arraySelectCheck);
  }
}
