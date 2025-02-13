import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInputComponent } from './file-input.component';

describe('FileInputComponent', () => {
  let component: FileInputComponent;
  let fixture: ComponentFixture<FileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileInputComponent);
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
      messagge: "",
      maxSize: 1,
      messageErrorMaxSize: "",
      typesFile: [''],
      messageErrorTypeFile: "",
      maxFiles: 1
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
