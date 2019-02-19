import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss'],
})
export class UbicacionComponent implements OnInit {
  // Variables entre Tabs | Components
  @Input() idProyectoTab: number;

  ngOnChanges(changes) {
    if (changes['idProyectoTab']) {
      // Aquí ya sabes que has recibido un nuevo dato desde cualquier componente.
      const nuevoDato = changes.idProyectoTab;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}