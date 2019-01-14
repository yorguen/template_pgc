/**
 * @author Nahum Martinez
 * @returns servicios de Actividades
 * @name NewActivityComponent
 * @alias _newActivityComponent
 * @version 1.0.0
 * @fecha 10/01/2019
 */
import { Component, OnInit, ChangeDetectorRef, Renderer2, ElementRef, ViewChild } from '@angular/core';

// AutoCompleter Services
import { CompleterData, CompleterService, CompleterItem } from 'ng2-completer';

// import {MatButtonModule} from '@angular/material/button';

// Servicios que la Clase nesesitara para su funcionanmiento
import { UserService } from '../../../@core/data/users.service'; // Servicio de Usuarios
import { ListasComunesService } from '../../common-list/services/listas-comunes.service'; // Servicio de Lista de Estados

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster'; // Servicio de Notificaciones
// import 'style-loader!angular2-toaster/toaster.css';
import { LocalDataSource } from 'ng2-smart-table'; // DataLocal de Ejemplo para el JSON de envio
import { ActivityConfigSmartTableService } from '../services/activity-config-smart-table.service';

// import { SmartTableService } from '../../../@core/data/smart-table.service'; // Servicio de la SmartTable de la API

import 'style-loader!angular2-toaster/toaster.css';

// Modelo de la Clase Activiades
import { ActivityModel } from '../models/model-activity';
import { Router } from '@angular/router';

// Variables de Jquery
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'ngx-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss', '../../components/notifications/notifications.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush, // Se usa para Actualizar la Informacion con otro evento
  providers: [ToasterService, ActivityConfigSmartTableService],
})
export class NewActivityComponent implements OnInit {
  /****************************************************************************
  * Variables: Definicion de las Variables de la Clase
  * Fecha: 16-08-2018
  * Descripcion: variables que se usan en toda la Clase de forma publica y
  * privada
  * Objetivo: Tener el acceso a todas las variables de la Clase
  ****************************************************************************/
  // Manipulacion del DOM
  @ViewChild('idPais') mySelectPais: ElementRef;

  // Configuracion del Toaster-Notifications
  protected captain: string;

  redirectDelay: number = 0;

  protected dataService: CompleterData;

  config: ToasterConfig;

  // Consfiguracion del Notificador
  position = 'toast-bottom-full-width';
  animationType = 'slideDown';
  title = 'Se ha grabado la Información! ';
  content = 'los cambios han sido grabados temporalmente, en la PGC!';
  timeout = 10000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  p: number = 1;

  // Configuracion de la SmartTable

  data: any;

  // DataSource de la Smart Table
  data1: any;
  data2: any;

  public settings;
  source: LocalDataSource;
  public listArrayEstados: any;
  public listArrayTipoOrg: any;
  public listArrayPaisOrg: any;
  public listArrayOrg: any;

  // Variables Tipo JSON, para usarlas en los Servicios Invocados
  public JsonReceptionEstados: any;
  public JsonReceptionSectorEjecutor: any;
  public JsonReceptionEstrategias: any;
  public JsonReceptionPresupuesto: any;
  public JsonReceptionEspaciosTrabajo: any;
  public JsonReceptionTiposOrganizacion: any;
  public JsonReceptionPaises: any;

  // Organizaciones
  protected searchStrFunc: string;
  public JsonReceptionAllOrganizaciones: any[];
  public JsonReceptionOrganizacionCode: any[];
  protected selectedOrganizicionesAll: string = '';
  protected selectedIdOrganizacion: string = '';
  protected selectedDescTipoOrganizacion: string = '';
  protected selectedPaisOrganizacion: string = '';
  protected selectedDescOrganizacion: string = '';
  public JsonReceptionAllOrganizacionesData: any;
  public countIdInternaFind: number;

  // Id Internas
  public JsonIdInternaOrganizacion = [];
  protected JsonReceptionTipoPaisOrganizacionesData: any;
  public JsonOrganizationSelect: any;
  public descPais: string;
  public descTipoOrganizacion: string;
  public descOrganizacion: string;

  // Instacia de la variable del Modelo | Json de Parametros
  public _activityModel: ActivityModel;

  // FIN | Definicion de las Variables de la Clase


  /****************************************************************************
  * Funcion: constructor
  * Object Number: 001
  * Fecha: 16-08-2018
  * Descripcion: Method constructor of the Class
  * Objetivo: constructor in the method header API
  ****************************************************************************/
  constructor(private _userService: UserService,
    private completerService: CompleterService,
    private _listasComunesService: ListasComunesService,
    // private service: SmartTableService,
    private changeDetectorRef: ChangeDetectorRef,
    // Inicializa el ToasterService
    private _toasterService: ToasterService,
    protected _router: Router,
    public _activityConfigSmartTableService: ActivityConfigSmartTableService) {
    // Llamamos a la Funcion de Configuracion de las Smart Table
    this._activityConfigSmartTableService.configSmartTableIdInternas(null, null, null);
    this.settings = this._activityConfigSmartTableService.settings;

    /* Llamado a la Funcion: 007, la cual obtiene el detalle da la Info.
     del Usuario */
    this.userDatailsService();

    // this.source = new LocalDataSource(this.data); // create the source

  } // FIN | constructor


  /****************************************************************************
  * Funcion: ngOnInit
  * Object Number: 002
  * Fecha: 16-08-2018
  * Descripcion: Method ngOnInit of the Class
  * Objetivo: ngOnInit in the method header API
  ****************************************************************************/
  ngOnInit() {
    // Inicializacion del Modelo de la Clase
    this._activityModel = new ActivityModel(
      0, // Id Actividad
      '', 0, 0, '', '', '', '', '', '', // Datos Generales de la Actividad
      0, 0, 0, // Planificacion
      '', '', '', 0, 0, null, '', '', // Resultados
      0, 0, 0, '', // Organizaciones Relaciones
      '', '', '', // Organizaciones Descripciones
    );

    /* Llamado a la Funcion: 008, la cual obtiene el listado de los Estados de
     que nesesita el Formulario de Actividades */
    this.estadosListService();

    /* Llamado a la Funcion: 009, la cual obtiene el listado de los Estados de
     que nesesita el Formulario de Actividades */
    this.sectorEjecutorListService();

    /* Llamado a la Funcion: 010, la cual obtiene el listado de las Estretegias
     de que nesesita el Formulario de Actividades */
    this.estrategiasListService();

    /* Llamado a la Funcion: 011, la cual obtiene el listado de los Presupuestos
     de que nesesita el Formulario de Actividades */
    this.presupuestoListService();

    /* Llamado a la Funcion: 012, la cual obtiene el listado de los Presupuestos
     de que nesesita el Formulario de Actividades */
    this.espaciosTrabajoListService();

    /* Llamado a la Funcion: 013, la cual obtiene el listado de los Tipos de
     Organizaciones de que nesesita el Formulario de Actividades */
    this.tiposOrganizacionListService();

    /* Llamado a la Funcion: 014, la cual obtiene el listado de los Paises
     que nesesita el Formulario de Actividades */
    this.paisesAllListService();

    /* Llamado a la Funcion: 015, la cual obtiene el listado de las Organizaciones
     que nesesita el Formulario de Actividades */
    this.organizacionesAllListService();

  } // FIN | ngOnInit


  /****************************************************************************
  * Funcion: makeToast
  * Object Number: 003
  * Fecha: 16-08-2018
  * Descripcion: Method makeToast of the Class
  * Objetivo: makeToast in the method header API
  ****************************************************************************/
  makeToast() {
    this.showToast(this.type, this.title, this.content);
  } // FIN | makeToast


  /****************************************************************************
  * Funcion: showToast
  * Object Number: 004
  * Fecha: 16-08-2018
  * Descripcion: Method showToast of the Class
  * Objetivo: showToast in the method header API
  ****************************************************************************/
  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    // this._toasterService.popAsync(toast);
    this._toasterService.pop(toast);
  } // FIN | showToast


  /****************************************************************************
  * Funcion: toasterconfig
  * Object Number: 004.1
  * Fecha: 16-08-2018
  * Descripcion: Method showToast of the Class
  * Objetivo: showToast in the method header API
  ****************************************************************************/
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: { 'warning': true, 'error': true },
    }); // FIN | toasterconfig


  /****************************************************************************
  * Funcion: onDeleteConfirm
  * Object Number: 005
  * Fecha: 09-01-2019
  * Descripcion: Method para Borrar Items de la SmartTable
  * Objetivo: enviar al Json de ID'Intermas la información que ocupa la API
  ****************************************************************************/
  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }// FIN | onDeleteConfirm


  /****************************************************************************
  * Funcion: onCreateConfirm
  * Object Number: 006
  * Fecha: 09-01-2019
  * Descripcion: Method para Cerar Items de la SmartTable
  * Objetivo: enviar al Json de ID'Intermas la información que ocupa la API
  ****************************************************************************/
  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
      // console.log(event.newData);
    } else {
      event.confirm.reject();
    }
  } // FIN | onCreateConfirm


  /****************************************************************************
  * Funcion: onSaveConfirm
  * Object Number: 006
  * Fecha: 09-01-2019
  * Descripcion: Method para Guardar Items de la SmartTable
  * Objetivo: enviar al Json de ID'Intermas la información que ocupa la API
  ****************************************************************************/
  onSaveConfirm(event) {
    if (window.confirm('Estas seguro de grabar la información modificada?')) {
      // event.newData['name'] += ' + added in code';
      alert(event.newData['username']);
      event.confirm.resolve(event.newData);
      // console.log(event.newData);
    } else {
      event.confirm.reject();
    }
  }// FIN | onSaveConfirm


  /****************************************************************************
  * Funcion: onEditedCompleter
  * Object Number: 006.1
  * Fecha: 09-01-2019
  * Descripcion: Method para Editar listas Items de la SmartTable
  * Objetivo: enviar al Json de ID'Intermas la información que ocupa la API
  ****************************************************************************/
  onEditedCompleter(event: { title: '' }): boolean {
    // this.cell.newValue = event.title;
    this.JsonOrganizationSelect = event.title;
    // const vari = JSON.stringify(event);
    // console.log('onEditedCompleter +++ ' + vari);
    return false;
  } // FIN | onEditedCompleter


  /* **************************************************************************/
  /* ****************** Funciones Propias de la Clase *************************/

  /****************************************************************************
  * Funcion: userDatailsService
  * Object Number: 007
  * Fecha: 16-08-2018
  * Descripcion: Method userDatailsService of the Class
  * Objetivo: userDatailsService detalle del Usuario llamando a la API
  ****************************************************************************/
  private userDatailsService() {
    this._userService.getUserDetails(this._userService.usernameHeader).subscribe(
      result => {

        if (result.status !== 200) {
          // console.log(result.status);
          this.showToast('error', 'Error al Obtener la Información del Usuario', result.message);
        } else {
          // console.log(result.data);
        }
      },
      error => {
        // Redirecciona al Login
        alert('Error en la petición de la API ' + <any>error);

        // Borramos los datos del LocalStorage
        localStorage.removeItem('auth_app_token');
        localStorage.removeItem('identity');

        const redirect = '/auth/login';
        setTimeout(() => {
          // Iniciativa Temporal
          location.reload();
          return this._router.navigateByUrl(redirect);
        }, this.redirectDelay);
      },
    );
  } // FIN | userDatailsService


  // ********** Invocacion de los Servicios Nesesarios para Funcionar *********

  /****************************************************************************
  * Funcion: estadosListService
  * Object Number: 008
  * Fecha: 16-08-2018
  * Descripcion: Method estListService of the Class
  * Objetivo: estListService listados de los Estados del Formulario de
  * Actividad llamando a la API
  ****************************************************************************/
  private estadosListService() {
    this._listasComunesService.getAllEstados(3).subscribe(
      result => {
        if (result.status !== 200) {
          // console.log(result.status);
          this.showToast('error', 'Error al Obtener la Información de Estados', result.message);
        } else if (result.status === 200) {
          // NADA
        }
      },
      error => {
        // console.log(<any>error);
        this.showToast('error', 'Error al Obtener la Información de Estados', error);
        // this.userDatailsService();
      },
    );
  } // FIN | estadosListService



  /****************************************************************************
  * Funcion: sectorEjecutorListService
  * Object Number: 009
  * Fecha: 22-08-2018
  * Descripcion: Method sectorEjecutorListService of the Class
  * Objetivo: sectorEjecutorListService listados de los Sectores Ejecutores
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private sectorEjecutorListService() {
    this._listasComunesService.getAllSectoresEjecutores().subscribe(
      result => {
        if (result.status !== 200) {
          // console.log(result.status);
          this.showToast('error', 'Error al Obtener la Información de los Sectores Ejecutores', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionSectorEjecutor = result.data;
        }
      },
      error => {
        // console.log(<any>error);
        this.showToast('error', 'Error al Obtener la Información de Sectores', error);
      },
    );
  } // FIN | sectorEjecutorListService


  /****************************************************************************
  * Funcion: estrategiasListService
  * Object Number: 010
  * Fecha: 22-08-2018
  * Descripcion: Method estrategiasListService of the Class
  * Objetivo: estrategiasListService listados de las Estrategias
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private estrategiasListService() {
    this._listasComunesService.getAllEstrategias().subscribe(
      result => {
        if (result.status !== 200) {
          // console.log(result.status);
          this.showToast('error', 'Error al Obtener la Información de los Estrategias', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionEstrategias = result.data;
        }
      },
      error => {
        // console.log(<any>error);
        this.showToast('error', 'Error al Obtener la Información de las Estrategias', error);
      },
    );
  } // FIN | estrategiasListService


  /****************************************************************************
  * Funcion: presupuestoListService
  * Object Number: 011
  * Fecha: 22-08-2018
  * Descripcion: Method presupuestoListService of the Class
  * Objetivo: presupuestoListService listados de los Presupuestos
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private presupuestoListService() {
    this._listasComunesService.getAllPresupuesto().subscribe(
      result => {
        if (result.status !== 200) {
          // console.log(result.status);
          this.showToast('error', 'Error al Obtener la Información de los Presupuesto', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionPresupuesto = result.data;
          // console.log(this.JsonReceptionPresupuesto);
        }
      },
      error => {
        // console.log(<any>error);
        this.showToast('error', 'Error al Obtener la Información de los Presupuestos', error);
      },
    );
  } // FIN | presupuestoListService


  /****************************************************************************
  * Funcion: espaciosTrabajoListService
  * Object Number: 012
  * Fecha: 12-10-2018
  * Descripcion: Method espaciosTrabajoListService of the Class
  * Objetivo: espaciosTrabajoListService listados de los Presupuestos
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private espaciosTrabajoListService() {
    this._listasComunesService.getAllEspaciosTrabajo().subscribe(
      result => {
        if (result.status !== 200) {
          // console.log(result.status);
          this.showToast('error', 'Error al Obtener la Información de los Espacios de Trabajo', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionEspaciosTrabajo = result.data;
          // console.log(this.JsonReceptionEspaciosTrabajo);
        }
      },
      error => {
        // console.log(<any>error);
        this.showToast('error', 'Error al Obtener la Información de los Espacios de Trabajo', error);
      },
    );
  } // FIN | espaciosTrabajoListService


  /****************************************************************************
  * Funcion: tiposOrganizacionListService
  * Object Number: 013
  * Fecha: 13-10-2018
  * Descripcion: Method tiposOrganizacionListService of the Class
  * Objetivo: tiposOrganizacionListService listados de los Tipos de Organizacion
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private tiposOrganizacionListService() {
    this._listasComunesService.getAllTipoOrganizacion().subscribe(
      result => {
        if (result.status !== 200) {
          // Respuesta del Error
          this.showToast('error', 'Error al Obtener la Información de los Tipos de Organizacion', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionTiposOrganizacion = result.data;
        }
      },
      error => {
        // console.log(<any>error);
        this.showToast('error', 'Error al Obtener la Información de los Tipos de Organizacion', error);
      },
    );
  } // FIN | tiposOrganizacionListService


  /****************************************************************************
  * Funcion: paisesAllListService
  * Object Number: 014
  * Fecha: 13-10-2018
  * Descripcion: Method paisesAllListService of the Class
  * Objetivo: paisesAllListService listados de los Paises
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private paisesAllListService() {
    this._listasComunesService.getAllPaises().subscribe(
      result => {
        if (result.status !== 200) {
          // console.log(result.status);
          this.showToast('error', 'Error al Obtener la Información de los Paises', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionPaises = result.data;
        }
      },
      error => {
        // console.log(<any>error);
        this.showToast('error', 'Error al Obtener la Información de los Paises', error);
      },
    );
  } // FIN | paisesAllListService


  /****************************************************************************
  * Funcion: organizacionesAllListService
  * Object Number: 015
  * Fecha: 15-10-2018
  * Descripcion: Method organizacionesAllListService of the Class
  * Objetivo: organizacionesAllListService listados de los Paises
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private organizacionesAllListService() {
    this._listasComunesService.getAllOrganizaciones().subscribe(
      result => {
        if (result.status !== 200) {
          // console.log(result.status);
          this.showToast('error', 'Error al Obtener la Información de las Organizaciones', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionAllOrganizaciones = result.data;
          this.JsonReceptionAllOrganizacionesData = JSON.stringify(this.JsonReceptionAllOrganizaciones);
          // console.log(JSON.stringify(this.JsonReceptionAllOrganizaciones));

          // Cargamos el compoenete de AutoCompletar
          this.dataService = this.completerService.local(this.JsonReceptionAllOrganizaciones, 'descOrganizacion',
            'descOrganizacion');
        }
      },
      error => {
        // console.log(<any>error);
        this.showToast('error', 'Error al Obtener la Información de las Organizaciones', error);
      },
    );
  } // FIN | organizacionesAllListService


  /*****************************************************
  * Funcion: FND-00001
  * Fecha: 18-10-2018
  * Descripcion: Funcion para AutoCompletar y sacar el
  * Id de la Data de la Tabla TblOrganizaciones
  * Params: $event
  ******************************************************/
  protected onSelectedFunc(item: CompleterItem) {
    // Envia la Organizacion seleccionada
    this.selectedIdOrganizacion = item ? item.originalObject.idOrganizacion : '';
    this.selectedDescOrganizacion = item ? item.originalObject.descOrganizacion : '';
    this.selectedDescTipoOrganizacion = item ? item.originalObject.idTipoOrganizacionT.nombreTipoOrganizacion : '';
    this.selectedPaisOrganizacion = item ? item.originalObject.idPaisOrganizacion.descPais : '';

    // Setea al Model el valor de la Organizacion
    this._activityModel.idOrganizacion = Number(this.selectedIdOrganizacion);
    // console.log(this._activityModel.idOrganizacion);
    // console.log(item.originalObject);
    this._activityModel.descOrganizacion = this.selectedDescOrganizacion;
    this._activityModel.descTipoOrganizacion = this.selectedDescTipoOrganizacion;
    this._activityModel.descPaisOrganizacion = this.selectedPaisOrganizacion;
  } // FIN | FND-00001


  /****************************************************************************
  * Funcion: organizacionesIdTipoIdPaisListService
  * Object Number: 016
  * Fecha: 15-10-2018
  * Descripcion: Method organizacionesIdTipoIdPaisListService of the Class
  * Objetivo: organizacionesIdTipoIdPaisListService listados de los Paises
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private organizacionesIdTipoIdPaisListService(idTipoOrganizacionSend: number, idPais: number) {
    // Condicion para evaluar que opcion se pulsa
    this._listasComunesService.getIdTipoIdPaisOrganizaciones(idTipoOrganizacionSend, idPais).subscribe(
      result => {
        if (result.status !== 200) {
          // Resultadps del Error
          this.showToast('error', 'Error al Obtener la Información de las Organizaciones, con los parametros enviados', result.message);
        } else if (result.status === 200) {
          this.JsonReceptionTipoPaisOrganizacionesData = result.data;
          this.data1 = this.JsonReceptionTipoPaisOrganizacionesData;

          // Carga los Items para el List de la Smart table
          this.listArrayOrg = new Array();

          this.data1.forEach(element => {
            this.listArrayOrg.push({ title: element['descOrganizacion'], value: element['idOrganizacion'] });
          });

          this.settings.columns.idOrganizacion.editor.config.list = this.listArrayOrg;
          this.settings = Object.assign({}, this.settings);
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de las Organizaciones, con los parametros enviados', error);
      },
    );
  } // FIN | organizacionesIdTipoIdPaisListService


  /****************************************************************************
  * Funcion: pushJsonIdInterna
  * Object Number: 017
  * Fecha: 09-11-2018
  * Descripcion: Method Creacion de nuevo File input
  * Objetivo: Creacion de nuevo File input listados de las ID Internas
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  private pushJsonIdInterna() {
    // Validamos que se ha Seleccionado los Filtros Previos a la ID Interna
    if (this._activityModel.idTipoOrganizacion === 0) {
      this.showToast('error', 'Error al Ingresar la Información de las ID Internas', 'Debes Seleccionar el Tipo de Organización, para continuar');
      return -1;
    } else if (this._activityModel.idPais === 0) {
      this.showToast('error', 'Error al Ingresar la Información de las ID Internas', 'Debes Seleccionar el País, para continuar');
      return -1;
    } else if (this._activityModel.idOrganizacion === 0) {
      this.showToast('error', 'Error al Ingresar la Información de las ID Internas', 'Debes Seleccionar la Organización, para continuar');
      return -1;
    }

    // Validacion de la Informacion a Ingresar
    if (this._activityModel.idInterna === '' || this._activityModel.idInterna === null) {
      this.showToast('error', 'Error al Ingresar la Información de las Organizaciones', 'Debes de Ingresar el Código del ID Interna, para continuar');
    } else {
      // Busqueda del Codigo del Perfil si Existe
      this.findOrganizacionByCode(this._activityModel.idInterna);
    }
  } // FIN | pushJsonIdInterna


  /****************************************************************************
  * Funcion: organizacionesIdTipoIdPaisListService
  * Object Number: 018
  * Fecha: 09-11-2018
  * Descripcion: Method Delete de nuevo File input, en Tabla
  * Objetivo: Delete de nuevo File input, en Tabla listados de las ID Internas
  * del Formulario de Actividad llamando a la API
  ****************************************************************************/
  // deleteRowHomeForm(homeFormIndex: number, codDocumentoIn: string, extDocumentoIn: string) {
  deleteRowHomeForm(homeFormIndex: number) {
    // Confirmar que se desea borrar ?
    const deletedItem = confirm('Esta seguro de borrar el Item de ID Interna Seleccionado ? ');

    if (deletedItem === true) {
      // Borra el Elemento al Json
      this.JsonIdInternaOrganizacion.splice(homeFormIndex, 1);
      this.changeDetectorRef.detectChanges();
      // this.JsonIdInternaOrganizacion.pdfDocumento = "";
      // Ejecutamos la Fucnion que Borra el Archivo desde le Servidor
      // this.borrarDocumentoServer(codDocumentoIn, extDocumentoIn);
      // console.log(this.JsonIdInternaOrganizacion);
    }
  }


  /****************************************************************************
  * Funcion: findOrganizacionByCode
  * Object Number: 019
  * Fecha: 09-01-2019
  * Descripcion: Method que valida si un Codigo de Organizacion para Id Interna
  * Existe, y no permitir su ingreso nuevamente
  * Objetivo: Validacion de Id Interna por Codigo
  ****************************************************************************/
  private findOrganizacionByCode(codeOrganizacionSend: string) {
    // Condicion para evaluar que opcion se pulsa
    this._listasComunesService.getOrganizacionByCodigoCount(codeOrganizacionSend).subscribe(
      result => {
        if (result.status !== 200) {
          // Resultadps del Error
          this.showToast('error', 'Error al Obtener la Información de la Organizacion, con los parametros enviados', result.message);
        } else if (result.status === 200) {
          this.countIdInternaFind = result.data;

          if (this.countIdInternaFind !== 0) {
            this.showToast('error', 'Error al Ingresar la Información de Id Interna en las Organizaciones', 'Ya existe un Código de Id Interna registrado en la BD');
            return -1;
          } else {
            // Ingresa el primer Item del json
            this.JsonIdInternaOrganizacion.push({
              'descTipoOrganizacion': this._activityModel.descTipoOrganizacion,
              'descPaisOrganizacion': this._activityModel.descPaisOrganizacion,
              'descOrganizacion': this._activityModel.descOrganizacion,
              'idInterna': this._activityModel.idInterna,
            });
            this._activityModel.idInterna = '';
            // this.data = this.JsonIdInternaOrganizacion;
            this.showToast('success', 'ID Interna Ingresada', 'Se ha Ingresado la ID Interna, a la Organización seleccionada');
          }
        }
      },
      error => {
        this.showToast('error', 'Error al Obtener la Información de las Organizaciones, con los parametros enviados', <any>error);
      },
    );
  } // FIN | findOrganizacionByCode

}
