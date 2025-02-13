import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'terra-form-advance-line',
  templateUrl: './advance-line.component.html',
  styleUrls: ['./advance-line.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AdvanceLineComponent implements OnInit{

  @ViewChild('progressBar') progressBar!: ElementRef;
  @Input() progress = 0;
  @Input() cantidadItems = "";

  actvarLineas2 = false;
  actvarLineas4 = false;

  async ngOnInit() {

    if(this.cantidadItems!==""){
      console.log(this.cantidadItems);
      console.log(document.getElementById(this.cantidadItems));
        switch(this.cantidadItems) {
          case "items-2-linea-avance":
            this.actvarLineas2 = true;
            break;
          case "items-4-linea-avance":
            this.actvarLineas4 = true;
            break;
        }
    }
  }

}
