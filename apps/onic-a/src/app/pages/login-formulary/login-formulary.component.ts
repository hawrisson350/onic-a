/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiModule } from '@onic-a/ui';
// import { IModalItem } from '../interfaces/modal.interface';
// import ENVIROMENTS from '../../environments/config';
// import axios from 'axios';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { AppComponent } from '../app.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CatalogoService, listaCatalogo } from '../services/catalogo.service';
// import { UsuariosServices } from '../services/usuarios/usuario.service';
// import { AuthService, http } from '@terra/utils';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { CuraduriasServices } from '../services/curaduria/curaduria.service';
// import { MenuService } from '../components/layout-private/sidebar-dynamic/data/menu.service';

export interface LoginData {
  usuarioId: number,
  curaduriaId: number,
  TipoUsuario: number,
  curadorId: number,
  estadoUsuario: number,
  roles: number[],
  tipoCuraduria: number
}

@Component({
  selector: 'terra-login-formulary',
  templateUrl: './login-formulary.component.html',
  styleUrls: ['./login-formulary.component.css'],
  imports: [RouterModule,UiModule, ReactiveFormsModule],
  
})
export class LoginFormularyComponent implements OnInit {
  formulario = new FormGroup({
    email: new FormControl(''),
    pass:new FormControl(''),
    });
  // @Output() eventlist = new EventEmitter<any>();
  // submmited = false;
  // submitted = false;
  // isCambioContrasena = false;
  // show = false;
  // modal = false;
  // modalMessage = false;
  // estadoUsuario = 0;
  // dataAux: any;
  // modalOptions: IModalItem = {
  //   title: '',
  //   subTitle: '',
  //   description: '',
  //   buttonLeft: 'Cerrar',
  //   buttonRight: 'Enviar',
  //   type: 'confirmation',
  // };
  // modalOptionsMessage: IModalItem = {
  //   title: '',
  //   subTitle: '',
  //   description: '',
  //   buttonLeft: 'Cerrar',
  //   buttonRight: '',
  //   type: 'warning',
  // };

  // isDisabled = true;
  // email = '';
  // emailCheck = false;
  // pass = '';
  // visible = true;
  // idUser = 0;
  // subtitleModal = 'Ingrese su comentario*:';
  // downText_Condiciones = 'Mínimo 20 caracteres, máximo 500 caracteres.';
  // CatalogoEstadosUsuario: listaCatalogo[] = [];
  // private authService = inject(AuthService);
  // private usuariosService = inject(UsuariosServices);
  // private curaduriasService = inject(CuraduriasServices);
  // private menuService = inject(MenuService);
  // private readonly fb = inject(FormBuilder);
  // private router = inject(Router);
  // subscriptionAuth!: Subscription;
  // subscriptionUser!: Subscription;

  // privileges: Array<string> = [];
  // urls: Array<string> = [];

  // constructor(
  //   private AppComponentExecution: AppComponent,
  //   private formBuilder: FormBuilder,
  //   private catalogoService: CatalogoService
  // ) {
  //   this.formulario = this.formBuilder.group({
  //     email: [null, []],
  //     pass: [
  //       null,
  //       [
  //         Validators.required,
  //         Validators.minLength(8),
  //         Validators.maxLength(16),
  //       ],
  //     ],
  //   });
  // }

  async ngOnInit() {
    console.log('Login Formulary');
  //   this.authService.removeTokenStorage();
  //   this.authService.removeUserStorage();
  //   this.CatalogoEstadosUsuario = await this.catalogoService.getCatalogo(
  //     'ESTADOUSUARIOS'
  //   );
  }

  // choseItem(option: any) {
  //   this.emailCheck = true;
  // }

  // password() {
  //   this.show = !this.show;
  // }
  // modalButtonOption(optionButton: any) {
  //   if (optionButton === 'Right') {
  //     this.email = '';
  //     this.pass = '';
  //   }
  //   this.modal = false;
  // }
  // selectNotification(type: string) {
  //   this.modalOptions.type = type;
  //   this.modal = true;
  // }

  // modalButtonOptionTerms(optionButton: any) {
  //   this.modal = false;
  // }

  // modalButtonOptionMessage(optionButton: any) {
  //   this.modalMessage = false;
  // }

  // selectNotificationMessage(type: string) {
  //   this.modalOptionsMessage.type = type;
  //   setTimeout(() => {
  //     this.modalMessage = true;
  //   }, 400);
  // }

  // notificationsTerm(
  //   title: string,
  //   message: string,
  //   type: string,
  //   subTitle: string
  // ) {
  //   this.modalOptions.title = title;
  //   this.modalOptions.description = message;
  //   this.modalOptions.subTitle = subTitle;
  //   this.modalOptions.type = type;
  //   this.modal = true;
  // }

  // async responde(event: any) {
  //   const myJsonString2 = {
  //     idUsuario: this.idUser,
  //     contenidoCorreo: event.response,
  //   };
  //   if (event.option === 'Right') {
  //     await http
  //       .post<any>(`${ENVIROMENTS.NX_POST_COMMENTS_USER}`, myJsonString2)
  //       .then((response: any) => {
  //         if (response.data == 0) {
  //           this.notifications(
  //             'Error en la solicitud',
  //             `Señor usuario, se ha producido un error al enviar su comentario.`,
  //             'modal_error',
  //             true
  //           );
  //         } else if (response.data == 1) {
  //           this.notifications(
  //             'Comentario enviado a validación',
  //             `Señor usuario, hemos recibido su mensaje de manera exitosa.` +
  //             ` A partir de este momento entrará en un proceso de validación por parte del administrador.`,
  //             'modal_exito',
  //             true
  //           );
  //         } else if (response.data == 2) {
  //           this.notifications(
  //             'Error en la solicitud',
  //             `Señor usuario, el mensaje debe contener mínimo 20 caracteres y un máximo de 500 caracteres.`,
  //             'modal_error',
  //             true
  //           );
  //         }
  //         this.pass = '';
  //         this.email = '';
  //       })
  //       .catch((error: any) => {
  //         this.notifications(
  //           'Error en la solicitud',
  //           'Señor usuario, ocurrio un error al enviar su comentario.',
  //           'modal_error',
  //           true
  //         );
  //       });
  //   }
  // }

  // async buttonContinue() {
  //   this.submmited = true;
  // }
  // retornarEstado(text: string): number {
  //   let valorInactivo = 0;
  //   this.CatalogoEstadosUsuario.forEach((estado) => {
  //     if (estado.text.toUpperCase().trim() === text) {
  //       valorInactivo = estado.value;
  //     }
  //   });
  //   return valorInactivo;
  // }

  // notifications(
  //   title: string,
  //   message: string,
  //   type: string,
  //   isLeftButtonWhite: boolean
  // ) {
  //   this.modalOptionsMessage.title = title;
  //   this.modalOptionsMessage.description = message;
  //   this.selectNotificationMessage(type);
  //   if (isLeftButtonWhite) {
  //     this.modalOptionsMessage.buttonLeft = 'Cerrar';
  //     this.modalOptionsMessage.buttonRight = '';
  //   } else {
  //     this.modalOptionsMessage.buttonLeft = 'Cerrar';
  //     this.modalOptionsMessage.buttonRight = 'Aceptar';
  //   }
  // }

  // async submitForm(): Promise<void> {
  //   this.submitted = true;
  //   try {
  //     if (this.formulario.valid) {
  //       const dataAuth = {
  //         username: this.formulario.value.email.toLowerCase(),
  //         password: this.formulario.value.pass,
  //       };
  //       const tokenResponse = await this.authService.auth(
  //         ENVIROMENTS.NX_POST_LOGIN,
  //         dataAuth
  //       );
  //       if (tokenResponse.accessToken !== null) {
  //         const helper = new JwtHelperService();
  //         const decoded = helper.decodeToken(tokenResponse.accessToken);
  //         const user = await this.authService.getUser(
  //           ENVIROMENTS.NX_GET_USER_AUTH,
  //           decoded.sub
  //         );
  //         const { id, email, firstName, lastName, enabled, username } = user;
  //         this.authService.saveTokenStorage(tokenResponse.accessToken);
  //         this.authService.saveRefreshToken(tokenResponse.refreshToken);
  //         // MENU //
  //         this.subscriptionUser = this.menuService
  //           .getMenuByUsuarioId(decoded.sub)
  //           .subscribe({
  //             next: (menu) => {
  //               if (menu?.length == null) {
  //                 menu = null;
  //               }
  //               for (let i = 0; i < menu?.length; i++) {
  //                 if (menu[i].actividades.length > 0) {
  //                   this.recurse(menu[i]);
  //                 }
  //               }
  //               this.authService.saveMenuStorage(menu);
  //             },
  //             error: (error) => {
  //               this.authService.saveMenuStorage(null);
  //             },
  //           });
  //         // MENU //
  //         await this.curaduriasService.ObtenerInformacionLogin(decoded.sub).subscribe({
  //           next: async (response: any) => {
  //             this.authService.saveUserStorage({ id, email, firstName, lastName, enabled, username, privileges: this.privileges, urls: this.urls, });
  //             const data = response.data;
  //             sessionStorage.setItem("dataUser", JSON.stringify(data));
  //             this.estadoUsuario = response.data.estadoUsuario;
  //             this.idUser=parseInt(response.data.usuarioId);
  //             if(parseInt(response.data.estadoUsuario)==this.retornarEstado('ACTIVO')){
  //               if (response.data.roles[0] == 15) {
  //                 this.router.navigate(['licencias/atencion-solicitud-solicitante']);
  //               } else if (response.data.roles[0] == 3 || response.data.roles[0] == 4) {
  //                 this.router.navigate(['licencias/atencion-solicitud-admin']);
  //               } else if (response.data.roles[0] == 5 || response.data.roles[0] == 6 || response.data.roles[0] == 7 || response.data.roles[0] == 8) {
  //                 this.router.navigate(['licencias-noadmin/atencion-solicitud-admin']);
  //               }
  //             }else if(parseInt(response.data.estadoUsuario)==this.retornarEstado('INACTIVO')){
  //               this.notificationsTerm(
  //                 'Su usuario se encuentra inactivo',
  //                 '',
  //                 'confirmation',
  //                 'Señor usuario, le informamos que su cuenta de usuario se encuentra en estado inactivo en nuestro sistema. Le brindamos la oportunidad de enviar un mensaje al administrador del sistema a continuación.'
  //               );
  //               this.authService.removeTokenStorage();
  //               this.authService.removeRefreshTokenStorage();
  //             }else if(parseInt(response.data.estadoUsuario)==this.retornarEstado('RECHAZADO')){
  //               this.notificationsTerm(
  //                 'Su usuario se encuentra en estado rechazado',
  //                 '',
  //                 'confirmation',
  //                 'Señor usuario, le informamos que su cuenta de usuario se encuentra en estado rechazado en nuestro sistema. Le brindamos la oportunidad de enviar un mensaje al administrador del sistema a continuación.'
  //               );
  //               this.authService.removeTokenStorage();
  //               this.authService.removeRefreshTokenStorage();
  //             }
              
  //           },
  //           error: (error) => {
  //             console.error(error);
  //             this.notifications(
  //               'Datos no encontrados',
  //               'No se pudieron recuperar los datos del usuario',
  //               'modal_error', true
  //             )
  //             this.authService.removeTokenStorage();
  //             this.authService.removeRefreshTokenStorage();
  //           }
  //         })
  //       } else {
  //         this.notifications(
  //           'Datos no encontrados',
  //           'No se pudieron recuperar los datos de usuario.',
  //           'modal_error',
  //           true
  //         );
  //       }

  //     } else {
  //       this.formulario.markAllAsTouched();
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       // Handle Axios errors
  //       const responseError = error.response;
  //       if (responseError) {
  //         console.error('Response Error:', responseError.data);
  //       } else {
  //         console.error('Axios Error:', error.message);
  //       }
  //     }
  //     this.notifications(
  //       'Datos no encontrados',
  //       'Inicio de sesión fallido.',
  //       'modal_error',
  //       true
  //     );
  //   }
  // }

  // verificarCambioContrasena(id: string) {
  //   this.usuariosService.verificarCambioContrasenaUsuario(id).subscribe({
  //     next: (response: any) => {
  //       this.isCambioContrasena = response.data;
  //     },
  //     error: (error) => {
  //       console.error(error);
  //       this.notifications(
  //         'Error en la transacción',
  //         'Se ha presentado un error desconocido, por favor intente nuevamente, de persistir contacte al administrador del sistema.',
  //         'modal_error',
  //         true
  //       );
  //     },
  //   });
  // }
  // recurse(node: any) {
  //   for (var i = 0, count = node.actividades?.length; i < count; i++) {
  //     if (
  //       node.actividades[i].url != undefined &&
  //       node.actividades[i].url != null &&
  //       node.actividades[i].url != ''
  //     ) {
  //       if (node.actividades[i].url.includes('/')) {
  //         this.urls.push(node.actividades[i].url);
  //       } else {
  //         this.urls.push('/' + node.actividades[i].url);
  //         node.actividades[i].url = '/' + node.actividades[i].url;
  //       }
  //     }

  //     if (
  //       node.actividades[i].privilegios != undefined &&
  //       node.actividades[i].privilegios != null &&
  //       node.actividades[i].privilegios != ''
  //     ) {
  //       for (
  //         var j = 0, countj = node.actividades[i].privilegios.length;
  //         j < countj;
  //         j++
  //       ) {
  //         this.privileges.push(this.removeAccents(node.actividades[i].nombre.toLowerCase().replace(/ /g,"-")) + '.' + this.removeAccents(node.actividades[i].privilegios[j].nombrePrivilegio.toLowerCase().replace(/ /g,"-")));
  //       }
  //     }

  //     this.recurse(node.actividades[i]);
  //   }
  // }

  // removeAccents(str: any) {
  //   return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // }
}
