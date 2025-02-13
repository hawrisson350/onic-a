import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'terra-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
})
export class PaginatorComponent implements OnChanges{
  // representa el recuento total de datos disponibles de la fuente
  @Input() totalCount = 1;

  // representa la página activa actual
  @Input() currentPage = 1;

  //representa los datos máximos que son visibles en una sola página
  @Input() pageSize = 1;


  //representa un nombre aria del paginador
  @Input() paginationDescription = 'Paginador default';

  // función que devuelve al padre el valor de página seleccionada
  @Output() pageChange = new EventEmitter<Paginator>();

  @Input() pageSizeElement: any[] = [];

  ngOnChanges(): void {
    // this.updatePage(this.currentPage > this.totalPages ? this.totalPages : this.currentPage)
  }

  opcionSeleccionado: number = 1;
  get totalPages(){return Math.ceil(this.totalCount / this.pageSize)}

  nextPage = () => {if(this.currentPage < this.totalPages)this.updatePage(this.currentPage + 1)}

  previousPage = () => {if(this.currentPage > 1)this.updatePage(this.currentPage -1)}

  selectPage = (page: number) => {if (this.currentPage !== page)this.updatePage(page)}

  updatePage(page: number){
    this.currentPage = page;
    const paginatorData: Paginator = {
      pageSize: this.pageSize,
      totalCount: this.totalCount,
      pageIndex: this.currentPage -1,
      firstElement: (this.currentPage -1) * this.pageSize,
      lastElement: ((this.currentPage * this.pageSize) - 1) > this.totalCount ? this.totalCount - 1 : ((this.currentPage * this.pageSize) - 1),
    };
    this.pageChange.emit(paginatorData);
  }

  get beforePages() {
    let beforePagesAux = this.currentPage !== 1 ? this.currentPage - 1 : this.currentPage;
    if (this.currentPage === this.totalPages)
      beforePagesAux -= 2;
    else if (this.currentPage === this.totalPages - 1)
      beforePagesAux -= 1;
    return beforePagesAux;
  }

  get afterPages() {
    let afterPagesAux = this.currentPage !== this.totalPages ? this.currentPage + 1 : this.currentPage;
    if (this.currentPage === 1)
      afterPagesAux += 2;
    else if (this.currentPage === 2)
      afterPagesAux += 1;
    return afterPagesAux;
  }

  createRange(start: number, size: number){
    const aux : number[]  = [];
    for (let p = start; p <= size; p++)
      aux.push(p)
    return aux;
  }

  onChangeSelect(){
   this.updatePage(this.opcionSeleccionado);
  }
}
export interface Paginator {
  pageSize: number;
  totalCount: number;
  pageIndex: number;
  firstElement: number;
  lastElement: number;
}


