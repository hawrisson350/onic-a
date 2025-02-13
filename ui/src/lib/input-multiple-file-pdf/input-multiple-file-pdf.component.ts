import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface ConfiguracionCargaArchivoMultiple {
  label: string,
  nombreArchivoFormData: string,
  mensaje: string,
  tamanoMaximo: number,
  mensajeErrorTamanoMaximo: string,
  tipoArchivo: string,
  mensajeErrorTipoArchivo: string,
  archivosPermitidos: number,
  botonValidacion?: boolean;
  iconoBasura?: boolean;
}
interface CaracteristicaArchivoMultiple {
  id?: any,
  name: string | undefined,
  size: string,
  file?: File,
}

@Component({
  selector: 'terra-input-multiple-file-pdf',
  templateUrl: './input-multiple-file-pdf.component.html',
  styleUrls: ['./input-multiple-file-pdf.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  
})
export class InputMultipleFilePdfComponent implements OnInit{
  /**Declaracion de variables */
  @Input() configuracionCargaArchivo!: ConfiguracionCargaArchivoMultiple;
  @Input() archivoFalloCarga = false;
  @Input() checkFile = false;
  @Output() eventoEmitirArchivo= new EventEmitter<any>();
  @Output() eventoBorrarArchivo= new EventEmitter<any>();
  @ViewChild('subirArchivo') referenciaInputArchivo!: ElementRef;
  @HostBinding('attr.id') myId;
  nombreArchivo = 'Sin archivo seleccionado';
  mensaje = '';
  trashIcon = true;
  /** En estas 3 variables se realiza el manejo del archivo para la correcta visualizacion,
   * archivo seleccionado es un input, debido a las vistas de editar usuarios cuando ya trae un archivo cargado
   * esta pensado para que maneje solo 1 archivo
  */
  archivoActual?: File[]=[];
  @Input() archivoSeleccionado: File[]=[];
  archivos: CaracteristicaArchivoMultiple[] = [];
  /** */
  mensajeError = '';
  error = false;
  desactivado = true;
  estaSeleccionado = false;
  archivoDesactivado= false;
  /** */
  /**On init, onchanges, constructor */
  ngOnInit(): void {
    this.mensaje = this.configuracionCargaArchivo.mensaje;
    //this.trashIcon = this.configuracionCargaArchivo.iconoBasura !== undefined ? this.configuracionCargaArchivo.iconoBasura : this.trashIcon;
    if (this.archivoSeleccionado.length > 0) {
      this.SetearArchivoEnEditar();
    }
  }
  constructor(private elRef: ElementRef) {
  this.myId = `my-dynamic-id-${this.elRef.nativeElement.tagName.toLowerCase()}-${Math.floor(Math.random() * 10000)}`;

  }
  /** */
  async EventoSeleccionarArchivo(event: Event) {
    this.archivoSeleccionado=[];
    this.archivoActual = [];
    this.archivos=[];
    /**Obtenemos el evento del dom y preguntamos si contiene archivos, si es false rompe el metodo */
    const inputTarget = event.target as HTMLInputElement;
    if (!inputTarget.files?.length) {
      return;
    }
    if (inputTarget.files.length > this.configuracionCargaArchivo.archivosPermitidos) {
      this.error = true;
      this.RestablecerVariables('Sin archivo seleccionado', "", true, `Se agregaron mas de ${this.configuracionCargaArchivo.archivosPermitidos} archivos`);
      return;
    }

    for (let i = 0; i < inputTarget.files.length; i++) {
      this.archivoActual.push(inputTarget.files[i]);
    }
    //this.archivoActual = inputTarget.files[0];

    //const extension = this.archivoActual.name.slice((this.archivoActual.name.lastIndexOf(".") - 1 >>> 0) + 2);
    const extensiones: string[] = this.archivoActual.map(archivo => archivo.name.slice((archivo.name.lastIndexOf(".") - 1 >>> 0) + 2));
    if (this.archivoActual.some(archivo => 
      !this.configuracionCargaArchivo.tipoArchivo.includes(
        archivo.name.slice((archivo.name.lastIndexOf(".") - 1 >>> 0) + 2).toUpperCase()))) {

      this.RestablecerVariables('Sin archivo seleccionado', '', true, this.configuracionCargaArchivo.mensajeErrorTipoArchivo);
      return;
    }
    const tipoValido = await this.obtenerTiposMIME(this.archivoActual);
    if (this.archivoActual.some(archivo => archivo.size > this.configuracionCargaArchivo.tamanoMaximo)) {
      this.RestablecerVariables('Sin archivo seleccionado', '', true, this.configuracionCargaArchivo.mensajeErrorTamanoMaximo);
      return;
    }
    if (extensiones.every(archivo => archivo.toLowerCase().endsWith('.pdf')  &&  !tipoValido.every(archivo => archivo.toLowerCase().endsWith('25504446')))) { //MIME de un archivo tipo pdf
      this.RestablecerVariables('Sin archivo seleccionado', '', true, this.configuracionCargaArchivo.mensajeErrorTipoArchivo);
      return;
    }
    this.desactivado = false;
    this.nombreArchivo = this.archivoActual[0].name;
    this.archivoActual.forEach(elemento => this.archivoSeleccionado.push(elemento));
    //this.archivoSeleccionado.push(this.archivoActual);
    this.error = false;
    this.mensajeError = '';
    this.estaSeleccionado = true;
  }
  SubirArchivo() {
    this.nombreArchivo = "Sin archivo seleccionado";
    this.mensajeError = '';
    this.mensaje = this.configuracionCargaArchivo.mensaje;
    this.desactivado = true;
    this.archivoSeleccionado.forEach((file, index) => {
      this.archivos.push(
        {
          id: index,
          name: file.name,
          size: this.ObtenerTamanoArchivo(file.size),
          file: file
        }
      );
    });
    if(this.configuracionCargaArchivo.archivosPermitidos == this.archivos.length){
      this.archivoDesactivado = true;//
    }
    this.error = false;
    this.eventoEmitirArchivo.emit(this.archivoSeleccionado);
    this.estaSeleccionado = false;

  }
  SetearArchivoEnEditar() {
    this.nombreArchivo = "Sin archivo seleccionado";
    this.mensajeError = '';
    this.mensaje = this.configuracionCargaArchivo.mensaje;
    this.desactivado = true;
    this.archivoSeleccionado.forEach((file, index) => {
      this.archivos.push(
        {
          id: index,
          name: file.name,
          size: this.ObtenerTamanoArchivo(file.size),
          file: file
        }
      );
    });
    this.archivoDesactivado = true;//
    this.error = false;
    this.estaSeleccionado = false;
  }
  BorrarArchivo(posicionArchivo: number) {
    this.referenciaInputArchivo.nativeElement.value = '';
    this.archivoActual?.splice(posicionArchivo, 1);
    this.archivoSeleccionado?.splice(posicionArchivo, 1);
    this.archivos?.splice(posicionArchivo, 1);
    this.archivoDesactivado = false;
    //this.RestablecerVariables;
    this.eventoBorrarArchivo.emit(posicionArchivo);
  }
  DescargarArchivo(posicionArchivo: number) {
    if(this.archivoSeleccionado[posicionArchivo]===undefined || this.archivoSeleccionado[posicionArchivo]===null){
      return;
    }
    const blob = new Blob([this.archivoSeleccionado[posicionArchivo]], { type: this.archivoSeleccionado[posicionArchivo].type });
    const pdfUrl = window.URL.createObjectURL(blob);
    window.open(pdfUrl, '_blank');
    const PDF_link = document.createElement('a');
    PDF_link.href = pdfUrl;
    PDF_link.download = this.archivoSeleccionado[posicionArchivo].name;
  }
  RestablecerVariables(nombreArchivo: string, archivo: string, error: boolean, mensajeError: string) {
    this.nombreArchivo = nombreArchivo
    this.referenciaInputArchivo.nativeElement.value = archivo
    this.error = error
    this.mensajeError = mensajeError
  }
  /*ObtenerTipoMIME(file: File): Promise<string> { // para obtener el MIME unico de un archivo ya sea pdf,jpg etc..
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onloadend = function (e: any) {
        let header = "";
        const arr = (new Uint8Array(e.target.result)).subarray(0, 4);
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        return resolve(header);
      };
      fileReader.onerror = reject;
      fileReader.readAsArrayBuffer(file);
    });
  }*/

  obtenerTiposMIME(files: File[]): Promise<string[]> {
      return Promise.all(files.map(file => 
        new Promise<string>((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.onloadend = function (e: any) {
            let header = "";
            const arr = (new Uint8Array(e.target.result)).subarray(0, 4);
            for (let i = 0; i < arr.length; i++) {
              header += arr[i].toString(16);
            }
            resolve(header);
          };
          fileReader.onerror = reject;
          fileReader.readAsArrayBuffer(file);
        })
    ));
  }

  ObtenerTamanoArchivo(size: number): string {
    const sizeKiloByte = (size * 0.001);
    const sizeMegaByte = (size / 1048576);
    if (sizeMegaByte >= 1) {
      return sizeMegaByte.toFixed(1) + 'Mb';
    } else {
      return sizeKiloByte.toFixed(1) + 'Kb';
    }
  }

}
