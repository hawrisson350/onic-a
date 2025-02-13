import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, OnChanges} from '@angular/core';
import axios from 'axios';
import { HttpHeaders} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface FeaturesFile {
  id?: any,
  name: string,
  size: string,
}

interface OptionsRequest{
  url: string,
  headers?: {}
}

interface UploadFiles{
  user?: any;
  module: string;
  baseUrl: string;
  featuresApiUpload: OptionsRequest;
  idCuraduria: number;
  idPeriodo: number;
  pathError: string;
}

interface UploadFileConfig{
  label: string,
  featuresApiUpload: OptionsRequest,
  featuresApiDelete: OptionsRequest,
  nameFileFormData: string,
  messagge: string,
  maxSize: number,
  messageErrorMaxSize: string,
  typesFile: string[],
  messageErrorTypeFile: string,
  maxFiles: number
}

@Component({
  selector: 'terra-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class FileInputComponent implements OnInit, OnChanges{

  @Input() uploadFileConfig!: UploadFileConfig;
  @Input() uploadFiles!: UploadFiles;
  @Input() isDisabled!: boolean;
  @Input() progressUploadedAux!: boolean;
  @Output() eventUpload: EventEmitter<any>;
  @Output() eventDelete: EventEmitter<any>;
  @Output() eventProcesar = new EventEmitter<any>();
  @ViewChild('fileUpload') fileInputReference!: ElementRef;

  disabledFile: boolean = false;
  error: boolean = false;
  fileName: string = 'Sin archivo seleccionado';
  messagge: string = '';
  progress: boolean = false;
  disabled: boolean = true;
  files: FeaturesFile[] = [];
  messaggeError: string = '';
  progressUploaded: boolean = false;
  
  selectedFiles: File[] = [];
  file?: File;
  visibled: boolean =  false;

  constructor(){
    this.eventUpload = new EventEmitter();
    this.eventDelete = new EventEmitter();
  }

  ngOnChanges() {
    this.disabledFile = this.isDisabled;
  }

  ngOnInit(): void{
    this.messagge = this.uploadFileConfig.messagge;
  }

  resetVariables(fileName: string, file: string, error: boolean, messaggeError: string){
    this.fileName = fileName
    this.fileInputReference.nativeElement.value = file
    this.error = error
    this.messaggeError = messaggeError
  }

  getMimeType(file: File): Promise<string>{
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onloadend = function(e: any){
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
      if(extension === 'pdf' && typeValid !== '25504446'){
        this.resetVariables('Sin archivo seleccionado', '', true, this.uploadFileConfig.messageErrorTypeFile);
        return;
      }

      if(extension === 'xlsx' && typeValid !== '504b34'){
        this.resetVariables('Sin archivo seleccionado', '', true, this.uploadFileConfig.messageErrorTypeFile);
        return;
      }

      if(extension === 'png' && typeValid !== '89504e47'){
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

      if (this.file.size > this.uploadFileConfig.maxSize) {
        this.resetVariables('Sin archivo seleccionado', '', true, this.uploadFileConfig.messageErrorMaxSize);
        return;
      }

      this.disabled = false;
      this.visibled = true;
      this.fileName = this.file.name;
      this.error = false;
      this.messaggeError = '';
      this.selectedFiles.push(this.file);
    }
  }

  uploadFile(){
    for (let i = 0; i < this.selectedFiles.length; i++) {
      if (this.selectedFiles[i]) {
        this.progress = true;
        this.messaggeError = '';
        this.messagge = this.uploadFileConfig.messagge;
        this.disabled = true;
        this.visibled = false;
        this.error = false;
        this.files.push(
          {
            id: this.files.length + 1,
            name: this.selectedFiles[i].name,
            size: this.getSizeFile(this.selectedFiles[i].size)
          }
        );
        this.progress = false;
        this.fileInputReference.nativeElement.value = '';
      }else{
       this.messaggeError = 'Seleccione un documento para adjuntar';
      }
    }
  }

  async procesar() {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      this.messaggeError = 'Seleccione un archivo';
      return;
    }
    this.progressUploaded = true;
    const parametrosArchivo = new FormData();
    this.selectedFiles.forEach((f) => parametrosArchivo.append('file', f));
    parametrosArchivo.append('tipoArchivoId','da1b4857-e8de-49be-9b8b-d5b833e21698');
    axios.post(this.uploadFiles.featuresApiUpload.url, parametrosArchivo,{
      withCredentials: false,
        headers: {
          "Content-Type": "multipart/form-data",
          'Access-Control-Allow-Origin': "*",
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
    }).then(async(response) => {
        this.files = [];
        this.fileName = "Sin archivo seleccionado";
        this.eventProcesar.emit(response.data);
        this.progressUploaded = false;
        this.messaggeError = '';
      }).catch(error => {
        this.progressUploaded = false;
        this.messaggeError = 'Error al intentar cargar el archivo, Intenta nuevamente.';
        this.error = true
      });
  }

  deleteFile(id: any){
    this.fileInputReference.nativeElement.value = '';
    // window.open(pdfUrl, '_blank');
    this.selectedFiles = [];
    this.file = undefined;
    //this.files = [];
    this.disabledFile = true;
    const filesTemporal = this.files;
    this.disabledFile = false;
    this.resetVariables;
    this.files = filesTemporal.filter((file) => {
      return file.id !== id;
    })
  }
}