import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'terra-chunks-progress',
  templateUrl: './chunks-progress.component.html',
  styleUrls: ['./chunks-progress.component.css'],
})
export class ChunksProgressComponent implements OnChanges{
  @Input() nombreArchivo = '';
  @Input() cantidadChunks = 0;
  widthScore = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cantidadChunks'] && !changes['cantidadChunks'].firstChange) {
      console.log(this.cantidadChunks);
      this.widthScore = this.cantidadChunks;
    }
  }
}
