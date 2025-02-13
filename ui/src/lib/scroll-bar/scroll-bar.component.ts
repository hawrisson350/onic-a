import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'terra-scroll-bar',
  templateUrl: './scroll-bar.component.html',
  styleUrls: ['./scroll-bar.component.css'],
  imports: [CommonModule],

})
export class ScrollBarComponent implements OnInit {
  @Input() scrollStyle: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
