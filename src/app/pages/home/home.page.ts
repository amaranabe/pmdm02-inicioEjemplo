import { InsertarPage } from './../insertar/insertar.page';
import { GestionPersonasService } from './../../servicios/gestion-personas.service';
import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

export interface IPersona {
  id: string;
  nombre: string;
  apellido: string;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //inicializamos en el constructor el servicio de la siguiente manera
  //es de tipo public para que puedas ser leído desde cualquier componente
  constructor(public gestionPersonas: GestionPersonasService, private alerta: AlertController, private modal: ModalController) {}

  borrar(id: string) {
    this.gestionPersonas.borrarPersona(id);
  }

  modificar(persona: IPersona) {
    //mostrará la ventana de alert y llamar a personas para modificar sus datos
    this.presentarAlerta(persona);

  }

  async presentarAlerta(persona: IPersona) {
    const alert = await this.alerta.create({
      header: 'Modificar',
      message: 'Actualiza los valores',
      inputs: [
        {
          name: 'ID',
          type: 'text',
          placeholder: 'Introduce ID',
          value: persona.id
        },
        {
          name: 'Nombre',
          type: 'text',
          placeholder: 'Introduce nombre',
          value: persona.nombre
        },
        {
          name: 'Apellido',
          type: 'text',
          placeholder: 'Introduce apellido',
          value: persona.apellido
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Modificar',
          handler: (data) => {
            console.log(data);
            this.gestionPersonas.modificarPersona(data.ID, data.Nombre, data.Apellido);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentarModal() {
    const modal = await this.modal.create({
      backdropDismiss: false,
      component: InsertarPage
    });
    return await modal.present();
  }

}
