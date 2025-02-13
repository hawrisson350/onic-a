import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedComponentsModule } from '@terra/shared-components';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";


import { LoginFormularyComponent } from './login-formulary.component';
import ENVIROMENTS from '../../environments/config';
import { AppComponent } from '../app.component';

describe('LoginFormularyComponent', () => {
  let component: LoginFormularyComponent;
  let fixture: ComponentFixture<LoginFormularyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormularyComponent],
      imports: [SharedComponentsModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
      providers: [{ provide: AppComponent, useValue: {} }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('continue', () => {
    component.email = "admin@minvivienda.gov.co";
    component.pass = "abc123";
    component.selectedType = "Correo";
    const mock = new MockAdapter(axios);
    mock.onGet(`${ENVIROMENTS.NX_GET_USER_ENABLED}`).reply(200, 
      {data: [{idUsuario: 1, correoElectronico: "admin@minvivienda.gov.co", idRol: 1, status: false}]});
    component.buttonContinue()
    expect(component.modal).toEqual(false)
  });

  it('continue fail', () => {
    component.email = "cualquiera@gmail.com";
    component.pass = "abc123";
    component.selectedType = "Correo";
    const mock = new MockAdapter(axios);
    mock.onGet(`${ENVIROMENTS.NX_GET_USER_ENABLED}`).reply(500, "error");
    component.buttonContinue()
    expect(component.modal).toEqual(false)
  });

  it('modal option redirection', () => {
    const optionButton = {
      option: 'Right',
      title: 'Enviar Información',
      textOption: 'Aceptar'
    }

    component.modalButtonOption(optionButton);
    expect(component.modal).toEqual(false)
  });

  it('modal option create', () => {
    component.modalButtonOption("Right");
    expect(component.modal).toEqual(false)
  });

  it('should select notification', () => {
    component.notifications(
      '¿Esta seguro de cancelar el registro?',
      '',
      'modal_warning'
    )
    expect(component.selectNotification).toBeCalled;
  });

  it('process Authorization success', async () => {
    const modalOptions = { option: 'Right', title: 'Hecho', textOption: 'Aceptar' }

    await component.modalButtonOption(modalOptions)

    expect(component.modal).toEqual(false)
  });

  it('get curator', () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${ENVIROMENTS.NX_GET_ID_CURATOR}/1`).reply(201, { data: [{idCurador: 12, idCuraduria: 36}]});
    component.getIdCurator()
    expect(component.modal).toEqual(false)
  });
});
