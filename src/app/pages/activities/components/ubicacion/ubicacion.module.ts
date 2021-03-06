/**
* @author Nahum Martinez
* @returns Modulo de Ubicaciones
* @name UbicacionModule
* @alias _ubicacionModule
* @version 1.0.0
* @fecha 29-06-2019
*/
import { NgModule } from '@angular/core';

// Modulo de Mapas
import { GMapModule } from 'primeng/gmap'; // NAM|209-06-29|Modulo de Google Maps
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// Modulo de confirmaciones
import { UbicacionRoutingModule, routedComponents } from './ubicacion-routing.module';

import { ThemeModule } from '../../../../@theme/theme.module';

// Primeng Imports
import { ButtonModule } from 'primeng/button';
import { ToasterModule } from 'angular2-toaster';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ConfirmDialogModule } from 'primeng/primeng';
import { KeyFilterModule } from 'primeng/keyfilter';

// Multiselect imports
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  imports: [
    ThemeModule,
    ButtonModule,
    ScrollPanelModule,
    UbicacionRoutingModule,
    GMapModule,
    LeafletModule.forRoot(), // Modulo de leaflet Maps
    ToasterModule.forRoot(), // Modulo de Toaster-Notification
    AngularMultiSelectModule,
    ConfirmDialogModule,
    KeyFilterModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    // ConfirmationService,
  ],
  exports: [
    ...routedComponents,
  ],
})
export class UbicacionModule { }
