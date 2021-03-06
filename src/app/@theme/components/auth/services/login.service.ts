import { Injectable } from '@angular/core';

// Clases nesesarias para el envio via Ajax
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';

// Importamos la Clase de las Propiedades del Sistema
import { SystemPropertiesService } from '../../../../shared/system-properties.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


// Clase de Propieades Globales de la PGC
@Injectable()
export class LoginService {
  // Propiedades de la Clases *************************************************
  // URL Base de la Clase, Referencia a la API | Spring
  public _url: string;

  // Variables para el localStorage
  public _identity;
  public _token;

  public headers = new HttpHeaders();

  /****************************************************************************
  * Funcion: Constructor
  * Fecha: 01-06-2018
  * Descripcion: Method Contructor of the Class
  * Objetivo: Login in the API
  ****************************************************************************/
  constructor(private _http: Http,
    private _systemPropertiesService: SystemPropertiesService) {
    this._url = this._systemPropertiesService.getmethodUrlService();

    // Seteo de los Headers
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': this.tokenHeader, 'Access-Control-Allow-Origin': '*',
    });
  }// FIN | Contructor


  /****************************************************************************
  * Funcion: FND-00001
  * Fecha: 01-06-2018
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (login).
  * Objetivo: Logearse a la Aplicacion
  ****************************************************************************/
  signUp(user_to_login) {
    const json = JSON.stringify(user_to_login);
    const params = json;

    // return this._http.post(this._url + "/auth/login", params, { headers:headers }).map( res => res.json());
    return this._http.post(this._url + '/auth/login', params)
      .map(res => res.json());
  }// FIN | FND-00001


  /****************************************************************************
  * Funcion: FND-00001
  * Fecha: 21-08-2018
  * Descripcion: Metodo para obtener los Datos de los Estados de la Actividad
  * Objetivo: datos de los Estados de las Actividades
  * Params: {  }
  ****************************************************************************/
  getAllEstados(idGrupo): Observable<any> {
    // Parametros solicitados (Grupo Solicitao)
    const paramSend = 1;
    // Retorno de la Funcion
    return this._http.get(this._url + '/estados/findByIdGrupo/' + paramSend)
      .map(res => res.json());
  }// FIN | FND-00001


  /****************************************************************************
  * Funcion: FND-00001
  * Fecha: 04-07-2018
  * Descripcion: Metodo para obtener los Datos del Usuario
  * Objetivo: datos generales del Usuario
  * Params: { userName }
  ****************************************************************************/
  getUserDetails(userName): Observable<any> {
    // Rol del Usuario que se logea
    const paramsU = userName;
    // Retorno de la Funcion
    return this._http.get(this._url + '/usuarios/findByRol/' + paramsU)
      .map(res => res.json());
  }// FIN | FND-00001


  /****************************************************************************
  * Funcion: FND-00002
  * Fecha: 01-06-2018
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (usuario/new).
  * Objetivo: Agregar nuevo Usuario
  *****************************************************************************/
  registerUser(user_to_register) {
    const json = JSON.stringify(user_to_register);
    const params = 'json=' + json;
    // console.log(json);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this._url + '/auth/user/new', params, { headers: headers })
      .map(res => res.json());
  }// FIN | FND-00002


  /****************************************************************************
  * Funcion: FND-00002.1
  * Fecha: 01-06-2018
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API ( usuario/change-pass-user ).
  * Objetivo: Cambiar Password a Usuario
  ****************************************************************************/
  changePassUser(user_to_change_pass) {
    const json = JSON.stringify(user_to_change_pass);
    const params = 'json=' + json + '&authorization=' + this.getToken();
    // console.log(json);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this._url + '/auth/user/change-pass-user', params, { headers: headers })
      .map(res => res.json());
  } // FIN | FND-00002




  /****************************************************************************
  * Funcion: FND-00003
  * Fecha: 01-06-2018
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  ****************************************************************************/
  getIdentity() {

    const identity = JSON.parse(localStorage.getItem('identity'));
    // Pregunta por el valor de la identity
    if (identity !== 'undefined') {
      this._identity = identity;
    } else {
      this._identity = null;
    }

    return this._identity;
  }// FIN | FND-00003


  /****************************************************************************
  * Funcion: FND-00004
  * Fecha: 01-06-2018
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  ****************************************************************************/
  getToken() {
    // No hace el parse; porque no es Json
    const token = localStorage.getItem('token');
    // Pregunta por el valor del Token
    if (token !== 'undefined') {
      this._token = token;
    } else {
      this._token = null;
    }

    return this._token;
  }// FIN | FND-00004

}// FIN | Clase
