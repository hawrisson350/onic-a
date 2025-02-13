import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import axios from 'axios';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



interface FeaturesFile {
  id?: any,
  name: string,
  size: string,
  file?: File,
}

interface OptionsRequest {
  url: string,
  headers?: {}
}

interface UploadFiles {
  user?: any;
  module: string;
  baseUrl: string;
  featuresApiUpload?: OptionsRequest;
  idCuraduria: number;
  idPeriodo: number;
  pathError: string;
}

interface UploadFileConfig {
  label: string,
  featuresApiUpload?: OptionsRequest,
  featuresApiDelete?: OptionsRequest,
  nameFileFormData: string,
  messagge: string,
  maxSize: number,
  messageErrorMaxSize: string,
  typesFile: string[],
  messageErrorTypeFile: string,
  maxFiles: number,
  validationButton?: boolean;
  trashIcon?: boolean;
}

@Component({
  selector: 'terra-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  
})

export class InputFileComponent implements OnInit,OnChanges {

  @Input() uploadFileConfig!: UploadFileConfig;
  @Input() uploadFiles!: UploadFiles;
  @Output() eventUpload: EventEmitter<any>;
  @Output() eventDelete: EventEmitter<any>;
  @Output() pruebaEvento = new EventEmitter<number>();
  @Output() emitFile = new EventEmitter<any>();
  @Output() eventProcesar = new EventEmitter<any>();
  @Output() botonCarga = new EventEmitter<boolean>();
  @ViewChild('fileUpload') fileInputReference!: ElementRef;
  @Input() checkFile: boolean = false;
  @ViewChild('myId') myDynamicIdElementRef: ElementRef | undefined;
  @HostBinding('attr.id') myId;
  disabledFile: boolean = false;
  ngContent = false;
  error: boolean = false;
  fileName: string = 'Sin archivo seleccionado';
  messagge: string = '';
  progress: boolean = false;
  disabled: boolean = true;
  disabledSeeFile: boolean = true;
  files: FeaturesFile[] = [];
  messaggeError: string = '';
  progressUploaded: boolean = false;
  @Input() selectedFiles: File[] = [];
  @Input() dummy = ''
  @Input() archivoFalloCarga= false;
  file?: File;
  visibled: boolean = false;
  prueba = 20;
  trashIcon: any = true;
  isSelected = false;

  constructor(private elRef: ElementRef) {
    this.eventUpload = new EventEmitter();
    this.eventDelete = new EventEmitter();
 this.myId = `my-dynamic-id-${this.elRef.nativeElement.tagName.toLowerCase()}-${Math.floor(Math.random() * 10000)}`;

  }

  ngOnInit(): void {
    this.messagge = this.uploadFileConfig.messagge;
    this.trashIcon = this.uploadFileConfig.trashIcon !== undefined ? this.uploadFileConfig.trashIcon : this.trashIcon
    // this.pruebaEvento.emit(this.prueba);
    if (this.selectedFiles.length > 0) {
      this.uploadFile()
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['archivoFalloCarga'] && changes['archivoFalloCarga'].currentValue === true) {
      this.deleteFile(0);
    }
  }
  

  resetVariables(fileName: string, file: string, error: boolean, messaggeError: string) {
    this.fileName = fileName
    this.fileInputReference.nativeElement.value = file
    this.error = error
    this.messaggeError = messaggeError
  }

  getMimeType(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onloadend = function (e: any) {
        let header = "";
        let arr = (new Uint8Array(e.target.result)).subarray(0, 4);
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        return resolve(header);
      };
      fileReader.onerror = reject;
      fileReader.readAsArrayBuffer(file);
    });
  }

  getSizeFile(size: number): string {
    const sizeKiloByte = (size * 0.001);
    const sizeMegaByte = (size / 1048576);
    if (sizeMegaByte >= 1) {
      return sizeMegaByte.toFixed(1) + 'Mb';
    } else {
      return sizeKiloByte.toFixed(1) + 'Kb';
    }
  }

  
  async onFileSelected(event: Event) {
    this.selectedFiles = [];
    const inputTarget = event.target as HTMLInputElement;
    if (!inputTarget.files?.length) {
      return;
    }
    
    this.uploadFileConfig.typesFile = this.uploadFileConfig.typesFile.map(extension => extension.toUpperCase());

    for (let i = 0; i < inputTarget.files.length; i++) {
      this.file = inputTarget.files[i];
      let extension = this.file.name.slice((this.file.name.lastIndexOf(".") - 1 >>> 0) + 2);

      if (!this.uploadFileConfig.typesFile.includes(extension.toUpperCase())) {
    
        this.resetVariables('Sin archivo seleccionado', '', true, this.uploadFileConfig.messageErrorTypeFile);
        return;
      }

      let typeValid = await this.getMimeType(this.file);
      if (this.file.size > this.uploadFileConfig.maxSize) {
        this.resetVariables('Sin archivo seleccionado', '', true, this.uploadFileConfig.messageErrorMaxSize);
        console.group(this.file.size, "prueba")
        return;
      }
      if (extension === 'pdf' && typeValid !== '25504446') {
  
        this.resetVariables('Sin archivo seleccionado', '', true, this.uploadFileConfig.messageErrorTypeFile);
        return;
      }

      if (extension === 'xlsx' && typeValid !== '504b34') {
        this.resetVariables('Sin archivo seleccionado', '', true, this.uploadFileConfig.messageErrorTypeFile);
        return;
      }

      if (extension === 'png' && typeValid !== '89504e47') {
        this.resetVariables('Sin archivo seleccionado', '', true, this.uploadFileConfig.messageErrorTypeFile);
        return;
      }

      if (extension === 'jpg' && typeValid !== 'ffd8ffe0') {
        this.resetVariables('Sin archivo seleccionado', '', true, this.uploadFileConfig.messageErrorTypeFile);
        return;
      }

      if (extension === 'jpeg' && typeValid !== 'ffd8ffe0') {
        this.resetVariables('Sin archivo seleccionado', '', true, this.uploadFileConfig.messageErrorTypeFile);
        return;
      }

      if (extension === 'csv' && typeValid !== '22496444') {
        this.resetVariables('Sin archivo seleccionado', '', true, this.uploadFileConfig.messageErrorTypeFile);
        return;
      }
      this.disabled = false;
      this.visibled = true;
      this.fileName = this.file.name;
      this.error = false;
      this.messaggeError = '';
      this.isSelected = true;
      this.selectedFiles.push(this.file);
      console.log(this.selectedFiles.length + ' tamaño files selected');
    }
  }

  uploadFile() {
    // for (let i = 0; i < this.selectedFiles.length; i++) {
    this.progress = false;
    this.fileName = "Sin archivo seleccionado";
    this.messaggeError = '';
    this.messagge = this.uploadFileConfig.messagge;
    this.disabled = true;
    this.visibled = false;
    this.botonCarga.emit(true);
    const filesNumber = this.selectedFiles.length + this.files.length;
    if (filesNumber <= this.uploadFileConfig.maxFiles) {
      this.selectedFiles.forEach((file, index) => {
        this.files.push(
          {
            id: index,
            name: file.name,
            size: this.getSizeFile(file.size),
            file: file
          }
        );
      });
      if (this.files.length >= this.uploadFileConfig.maxFiles) this.disabledFile = true;
      this.error = false;
      this.emitFile.emit(this.selectedFiles);
      this.progress = false;
      this.disabledSeeFile = false;
      this.isSelected = false;
  	  this.eventUpload.emit(this.selectedFiles.length);
    } else {
      this.error = true;
      this.resetVariables('Sin archivo seleccionado', "", true, `Se agregaron más de ${this.uploadFileConfig.maxFiles} archivos`)
    }
  }

  downloadFile() {
    let blob = new Blob([this.selectedFiles[0]], { type: this.selectedFiles[0].type });
    let pdfUrl = window.URL.createObjectURL(blob);
    window.open(pdfUrl, '_blank');
    var PDF_link = document.createElement('a');
    PDF_link.href = pdfUrl;
    PDF_link.download = this.selectedFiles[0].name;
    //PDF_link.click();
  }

  deleteFile(id: any) {
    this.fileInputReference.nativeElement.value = '';
    // window.open(pdfUrl, '_blank');
    this.selectedFiles = [];
    this.file = undefined;
    //this.files = [];
    this.disabledSeeFile = true;
    const filesTemporal = this.files;
    this.disabledFile = false;
    this.resetVariables;
    this.files = filesTemporal.filter((file) => {
      return file.id !== id;
    })
    this.eventDelete.emit(true);
  }

  procesar() {
    this.eventProcesar.emit(this.files);
    this.files = [];
    this.selectedFiles = [];
    this.file = undefined;
    this.fileInputReference.nativeElement.value = '';
    this.disabledSeeFile = true;
    this.resetVariables;
  }
}

