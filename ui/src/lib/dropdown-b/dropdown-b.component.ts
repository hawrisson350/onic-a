import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'terra-dropdown-b',
  templateUrl: './dropdown-b.component.html',
  styleUrls: ['./dropdown-b.component.css'],
  imports: [CommonModule, FormsModule ,ReactiveFormsModule],
})
export class DropdownBComponent implements OnInit {

  @Input() lista!: any[];
  @Input() isDisabled = false;
  @Input() requiredField = false;
  @Input() isWidth = false;
  @Input() checkboxItem = false;
  @Input() showSearchBar = false;
  @Input() bandera = true;
  @Input() isClear = false;
  @Input() configs!: {
    labelText: string, helpText: string, title: string
  };
  @Output() eventlist = new EventEmitter<any>();
  @Output() eventlistObj = new EventEmitter<any>();
  @ViewChild('dropdownMenuContainer') dropdownMenuContainer: ElementRef | undefined;

  selectedOption = {
    value: '',
    text: ''
  };
  selectedIndex = 0;
  searchText: string = '';  
  arrayResultSearch: any;
  isValidType: boolean = false;
  SelectedAll:boolean=false;
  auxValidate:boolean=false;
  

  constructor() { }
  ngOnInit(): void {    
    this.arrayResultSearch = this.lista;
  }
  ngOnChanges(changes: SimpleChanges) {

    this.arrayResultSearch = this.lista;
    if (changes['isClear']?.currentValue || changes['value']?.currentValue === "") {
      this.configs.title = 'Escoger'
  }
  }

  onKeyUp(event: KeyboardEvent) {        
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (this.selectedIndex === undefined) {
        this.selectedIndex = 0;
      } else {
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.arrayResultSearch.length - 1);  
      }
      this.selectedOption = this.arrayResultSearch[this.selectedIndex];
      this.scrollIntoView('down')
      this.configs.title = this.selectedOption.text;
      
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      
      if (this.selectedIndex === undefined) {
        this.selectedIndex = this.arrayResultSearch.length - 1;
      } else {
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
      }
      this.selectedOption = this.arrayResultSearch[this.selectedIndex];
      this.scrollIntoView('up')
      this.configs.title = this.selectedOption.text;
    }
    if (this.selectedOption.text !== '') {
      this.choseItem(this.selectedOption.text);
      this.choseItemObj(this.selectedOption);
    }
  }

  choseItem(option: any) {        
    this.configs.title = option
    this.eventlist.emit(option);
  }

  choseItemObj(optionObj: any) {        
    this.configs.title = optionObj.text;
    const index = this.lista.findIndex(obj => obj.text === optionObj.text);
    this.selectedOption = this.lista[index];
    this.eventlistObj.emit(optionObj);
  }

  choseItemObjSelector(optionObj: any) {
    this.selectedOption.text=optionObj.text
    const elementToFind = { value: "", text: "Seleccionar Todos", check: true };
    const hasElement = this.lista.some(item => (
      item.value === elementToFind.value &&
      item.text === elementToFind.text &&
      item.check === elementToFind.check
    ));
    if(optionObj.text=='Seleccionar Todos'){

      if(this.SelectedAll){
        this.lista.forEach(element => {
          element.check=false;
        });
        this.SelectedAll=false; 
        this.eventlistObj.emit([]);
      }else{
        this.lista.forEach(element => {
          element.check=true;
        });
        this.SelectedAll=true;
        
        this.configs.title = `Seleccionados (${this.lista.length-1})`
        this.eventlistObj.emit(this.lista);
      }
      
    }else{
      if(hasElement){
        this.lista.forEach(element => {
          element.check=false;
        });
        this.SelectedAll=false;  
        this.eventlistObj.emit([])
      }else{
        const index = this.lista.findIndex(
          x => x.text === optionObj.text,
        );
    
        this.lista[index].check = !optionObj.check
        const filteredArray = this.lista.filter(obj => obj.check);
    
        if (filteredArray.length <= 1) {
          const title = filteredArray.map(obj => obj.text);
          const concatenatedTitle = title.join(', ');
          this.configs.title = concatenatedTitle
        } else {
          this.configs.title = `Seleccionados (${filteredArray.length})`
        }
        this.eventlistObj.emit(filteredArray);
      }
    }   
    this.auxValidate=this.validateCheckFalse();
  }
  validateCheckFalse():boolean{
    let aux=false;
    this.lista.forEach(element => {
      if(element.check==true){
        aux= true;
      }
    });
    return aux;
  }

  scrollIntoView(Direction: string) {
    if(Direction == 'up'){      
      const liElements = this.dropdownMenuContainer?.nativeElement.querySelectorAll('.itemsA li');
      if (liElements && liElements.length > 0) {
        const activeElement = liElements[this.selectedIndex];
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
    else if(Direction == 'down'){      
      const liElements = this.dropdownMenuContainer?.nativeElement.querySelectorAll('.itemsA li');
      if (liElements && liElements.length > 0) {
        const activeElement = liElements[this.selectedIndex+1];
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }

  onInputChange() {    
    this.isValidType = false;
    let resultSearch = this.lista.filter((element) => element.text.toString().toLowerCase().includes(this.searchText.toLowerCase()));
    this.arrayResultSearch = resultSearch;
  }

  onFocusOutEvent(event: any){        
    this.requiredField = true;     
 }
 cleanSelectedOption(){
  this.selectedOption.text='';
  this.selectedOption.value='';
 }
}
