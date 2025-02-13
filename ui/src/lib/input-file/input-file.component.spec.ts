import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputFileComponent } from './input-file.component';
import { blob } from 'stream/consumers';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('InputFileComponent', () => {
  let component: InputFileComponent;
  let fixture: ComponentFixture<InputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [InputFileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFileComponent);
    component = fixture.componentInstance;
    component.uploadFileConfig = {
      label: "",
      featuresApiUpload: {
        url: "",
        headers: {}
      },
      featuresApiDelete: {
        url: "",
        headers: {}
      },
      nameFileFormData: "",
      messagge: "algo",
      maxSize: 1,
      messageErrorMaxSize: "",
      typesFile: [''],
      messageErrorTypeFile: "",
      maxFiles: 1,
    }
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check-changes', () => {
    const blob1 = new File(["testing"], __filename)
    component.selectedFiles = [blob1]
    component.ngOnInit()
    expect(component.uploadFile()).toBeCalled
  });


  // it('should reset Variable', () => {

  //   component.resetVariables('file', 'file', false, 'error_prueba' )
  // });
  it('should create', () => {
    const blob1 = new File(["testing.pdf"], __filename)
    component.getMimeType(blob1)
  });


  it('should download file', () => {
    const blob1 = new File(["testing"], __filename)
    component.selectedFiles = [blob1]
    window.URL.createObjectURL = jest.fn();
    window.open = jest.fn();
    component.downloadFile()
  });


  it('should delete File', () => {
    const blob1 = new File(["testing"], __filename)
    component.selectedFiles = [blob1]
    window.URL.createObjectURL = jest.fn();
    window.open = jest.fn();
    component.deleteFile('1')
  });

  it('should process File', () => {
    component.procesar()
  });
  it('should select a valid file', async () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockInputTarget = {
      files: [mockFile]
    };
    const mockEvent = {
      target: mockInputTarget
    };

    // Set up uploadFileConfig and other necessary variables

    await component.onFileSelected(mockEvent);
    expect(component.selectedFiles.length).toBe(1);
    expect(component.selectedFiles[0]).toBe(mockFile);
    expect(component.disabled).toBe(false);
    expect(component.visibled).toBe(true);
    expect(component.fileName).toBe('test.jpg');
    expect(component.error).toBe(false);
    expect(component.messaggeError).toBe('');
  });

})





