import { GestionPersonasService } from './../../servicios/gestion-personas.service';
import { Component, OnInit } from '@angular/core';
import { modalController } from '@ionic/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-insertar',
  templateUrl: './insertar.page.html',
  styleUrls: ['./insertar.page.scss'],
})
export class InsertarPage implements OnInit {
  id: string;
  nombre: string;
  apellido: string;
  
  //inicializamos el servicio
  constructor(private gestionPersonas: GestionPersonasService, public modal: ModalController) { }

  ngOnInit() {
  }

  onClick() {

    // Insertar
    this.gestionPersonas.insertarPersonas(this.id, this.nombre, this.apellido);

    //dismiss
    this.modal.dismiss();
  }

}
