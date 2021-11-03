import { IPersona } from './../pages/home/home.page';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


//Clase que se podrá utilizar desde cualquier otro componente de la aplicación
@Injectable({
  providedIn: 'root'
})
export class GestionPersonasService {
  
  //Lectura de fichero json
  //eliminamos los datos del array de tipo IPersona, pero declaramos esa variable
  private personas: IPersona[] = [];

  //inicializamos el servicio HttpClient
  constructor(private leerFichero: HttpClient) { 
    this.getPersonasFichero();
  }

  //Método que leerá un fichero JSON usando una clase Observable
  getPersonasFichero() {

    //declaramos un observable
    let datosFichero: Observable<IPersona[]>;

    //inicializamos
    datosFichero=this.leerFichero.get<IPersona[]>("/assets/datos/personas.json");

    //subscripción
    datosFichero.subscribe(datos => {
      console.log(datos);
      this.personas.push(...datos); //asignamos los datos al array personas
    });

  }

  //Metodo que puestra las personas almacendas en un array
  getPersonas() {
    return this.personas;
  }

  //Método que inserta nueva persona
  insertarPersonas(id: string, nombre: string, apellido: string) {
    //Creamos la nueva IPersonas
    let nuevaPersona: IPersona = {
      id: id,
      nombre: nombre,
      apellido: apellido
    };

    //insertamos la nueva IPersonas
    this.personas.push(nuevaPersona);
    console.log(this.personas); 

  }

  //Método que borra una persona con el id dado
  borrarPersona(id: string){
    //Busca la persona con el id dado
    let personaEncontrada = this.personas.find(function(cadaPersona) {return cadaPersona.id==id}); //al método find le insertamos una función que le indica como hacer la búsqueda
    
    //Busca el indice de la persona
    let indice: number = this.personas.indexOf(personaEncontrada);

    //Borramos la persona con el indice obtenido
    this.personas.splice(indice, 1); //1 indica el número de personas a borrar
    console
  }

  //Método que modifica los datos insertados
  modificarPersona(id: string, nombre: string, apellido: string) {

    let personaEncontrada: IPersona = this.personas.find(function(cadaPersona) {return cadaPersona.id == id});
    let indice: number = this.personas.indexOf(personaEncontrada);
    //modificamos
    this.personas[indice].nombre = nombre;
    this.personas[indice].apellido = apellido;

  }


}
