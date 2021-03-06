import { NgModule } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';

import { HttpClientModule } from '@angular/common/http';

// Imports de Tabla Smart de Angular
import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { SmartTableService } from '../../@core/data/smart-table.service';

// Imports de Toaster-Notification Service
import { ToasterModule } from 'angular2-toaster';

// Imports de Material Angular
import { MatButtonModule, MatExpansionModule } from '@angular/material';

import { Ng2CompleterModule } from 'ng2-completer';

import { ThemeModule } from '../../@theme/theme.module';
import { ActivitiesRoutingModule, routedComponents } from './activities-routing.module';

// Imports de las Librerias de uso Comun de la Clase en el Formulario de Actividad
import { ListasComunesService } from '../common-list/services/listas-comunes.service';
import { FilterdataPipe } from './pipes/filterdata.pipe';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NbRouteTabsetModule } from '@nebular/theme/components/route-tabset/route-tabset.module';

// Modulo de Mapas
import { UbicacionModule } from './components/ubicacion/ubicacion.module'; // NAM|2019-06-29|Modulo de Mapas

import { OdsComponent } from './components/sectores-programas/sectores/ods/ods.component';
import { ProgramasComponent } from './components/sectores-programas/programas/programas.component';
import { SectoresProgramasOdsComponent } from './components/sectores-programas/sectores/sectores-ods.component';

// Modulo de la Libreria Primeng
import { FieldsetModule } from 'primeng/fieldset';
import { TreeModule } from 'primeng/tree';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ListboxModule } from 'primeng/listbox';
import { RecursosProyectoComponent } from './components/recursos-proyecto/recursos-proyecto.component';
import { DropdownModule, EditorModule, AutoCompleteModule, KeyFilterModule, CalendarModule, DialogModule, InputMaskModule, AccordionModule, TabViewModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FilterPipe } from './pipes/filter.pipe';

// Sectores de Proyectos
import { SectoresGobiernoComponent } from './components/sectores-programas/sectores/sectores-gobierno/sectores-gobierno.component';
import { SectoresOcdeComponent } from './components/sectores-programas/sectores/sectores-ocde/sectores-ocde.component';
import { SectoresCamposTransversalesComponent } from './components/sectores-programas/sectores/sectores-campos-transversales/sectores-campos-transversales.component';

// Programas de Nacion
import { VisionPaisComponent } from './components/sectores-programas/programas/visionpais/visionpais.component';
import { VidaMejorComponent } from './components/sectores-programas/programas/vida-mejor/vida-mejor.component';
import { PlanNacionComponent } from './components/sectores-programas/programas/plan-nacion/plan-nacion.component';
import { OdsModalMetasComponent } from './components/sectores-programas/sectores/ods/modals/ods-modal-metas/ods-modal-metas.component';
import { OrganizacionesComponent } from './components/organizaciones/organizaciones.component';
import { SocioDesarrolloComponent } from './components/organizaciones/socio-desarrollo/socio-desarrollo.component';
import { PoliticasPublicasComponent } from './components/sectores-programas/programas/politicas-publicas/politicas-publicas.component';
import { UnidadEjecutoraComponent } from './components/organizaciones/unidad-ejecutora/unidad-ejecutora.component';
import { AdmonFinancieroComponent } from './components/organizaciones/admon-financiero/admon-financiero.component';
import { AgenciaBeneficiariaComponent } from './components/organizaciones/agencia-beneficiaria/agencia-beneficiaria.component';

import { DocumentosComponent } from './components/recursos-proyecto/documentos/documentos.component';
import { LinkComponent } from './components/recursos-proyecto/link/link.component';

import { ToastModule } from 'primeng/toast';
import { ContactosComponent } from './components/recursos-proyecto/contactos/contactos.component';
import { ModalUpdateContactoComponent } from './components/recursos-proyecto/contactos/modal-update-contacto/modal-update-contacto.component';
import { ModalNewContactoComponent } from './components/recursos-proyecto/contactos/modal-new-contacto/modal-new-contacto.component';

// Recursos de Proyecto
import { ModalDocumentosComponent } from './components/recursos-proyecto/documentos/modal-documentos/modal-documentos.component';
import { ModalLinkComponent } from './components/recursos-proyecto/link/modal-link/modal-link.component';

// Modulo de Financiamiento
import { FinanciamientoModule } from './components/financiamiento/financiamiento.module';

@NgModule({
  imports: [
    ThemeModule,
    FileUploadModule,
    HttpClientModule,
    ActivitiesRoutingModule,
    Ng2SmartTableModule, // Modulo Base del pluguin de TableSmart
    ToasterModule.forRoot(), // Modulo de Toaster-Notification
    Ng2CompleterModule,
    MatButtonModule,
    MatExpansionModule,
    NgxPaginationModule,
    AngularMultiSelectModule,
    FormsModule,
    MyDatePickerModule, // Modulo de Fechas
    NgxSpinnerModule, // Modulo de Spinner
    NbRouteTabsetModule, // Modulo de Rutas para los tabs,
    FieldsetModule,
    TreeModule,
    DropdownModule,
    ConfirmDialogModule,
    EditorModule,
    MessagesModule,
    MessageModule,
    ListboxModule,
    FileUploadModule, // modulo de file upload
    AutoCompleteModule,
    KeyFilterModule,
    CalendarModule,
    DialogModule,
    InputMaskModule,
    AccordionModule, // NAM|2019-05-28|modulo de Acordiones
    TabViewModule, // NAM|2019-06-03|modulo de tabs de primeNG
    ToastModule, // NAM|2019-06-03|modulo de toast
    UbicacionModule, // NAM|2019-06-29|modulo de Ubicaciones
    FinanciamientoModule, // NAM|2019-07-09|modulo de Financiamiento
  ],
  declarations: [
    ...routedComponents,
    FilterdataPipe,
    OdsComponent,
    ProgramasComponent,
    SectoresProgramasOdsComponent,
    RecursosProyectoComponent,
    FilterPipe,
    SectoresGobiernoComponent,
    SectoresOcdeComponent,
    SectoresCamposTransversalesComponent,
    VisionPaisComponent,
    VidaMejorComponent,
    PlanNacionComponent,
    PoliticasPublicasComponent,
    OdsModalMetasComponent,
    OrganizacionesComponent,
    SocioDesarrolloComponent,
    PoliticasPublicasComponent,
    UnidadEjecutoraComponent,
    AdmonFinancieroComponent,
    AgenciaBeneficiariaComponent,
    DocumentosComponent,
    LinkComponent,
    ContactosComponent,
    ModalUpdateContactoComponent,
    ModalNewContactoComponent,
    ModalDocumentosComponent,
    ModalLinkComponent,
  ],
  providers: [
    // SmartTableService, // Defincion del Servicio que provee los Datos de la Tabla: ID's Internas
    ListasComunesService,
    ConfirmationService,
  ],
  entryComponents: [
    OdsModalMetasComponent,
    ModalUpdateContactoComponent, // JOE 01-07-2019
    ModalNewContactoComponent, // JOE 01-07-2019
    ModalLinkComponent,
    ModalDocumentosComponent,
  ],
})
export class ActivitiesPGCModule { }
