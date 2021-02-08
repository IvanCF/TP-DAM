import { Component } from "@angular/core";
//import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";
import { EnlaceAPIService } from "../services/enlaceApi.service";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  public valorObtenido: any = 0;
  public detalle_valor_dispositivo: any = 0;
  public dispositivos: any;
  public dispositivoSinRepetir: any;
  public nombreSensor: string;
  public nombreUbicacion: string;
  public dispositivoLog: any;
  public estadoSensor: any;

  constructor(
    public enlaceAPI: EnlaceAPIService,
    private router: Router,
    public toastController: ToastController
  ) {
    /***************** cargamos los dispositivos ********************** */
    this.enlaceAPI.getListarDispositivos().subscribe((listaDispositivos2) => {
      console.log("inicia constructor: " + listaDispositivos2);
      this.dispositivoSinRepetir = listaDispositivos2;
    });

    /****************los log actuales para saber los estado***************** */

    this.enlaceAPI.getListaLogs().subscribe((listaDispositivos3) => {
      this.dispositivoLog = listaDispositivos3;
    });

    /*********************************** */

    this.presentToast();
  }

  /***************pruebaaaaa***************** */

  ngOnInit() {
    console.log("se vuelve a crear");
  }

  recargar(id: number) {
    console.log("recargar");
  }

  /*********************************************************** */
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Dispositivos listados",
      duration: 2500,
      color: "primary",
    });
    toast.present();
  }

  enviarCodigo(id: number) {
    console.log("codigo a analizar antes del grafico: " + id);

    this.enlaceAPI
      .obtenerValorMasActualById(id)
      .subscribe((listaDispositivos3) => {
        this.detalle_valor_dispositivo = listaDispositivos3;
        console.log(
          "Llega para el grafico: " + JSON.stringify(listaDispositivos3)
        );
        for (var i in this.detalle_valor_dispositivo) {
          this.valorObtenido = this.detalle_valor_dispositivo[i].valor; //se asigna nuevo valor
        }

        /***************** para saber su identificacion ********************** */
        for (var j in this.dispositivoSinRepetir) {
          if (this.dispositivoSinRepetir[j].dispositivoId == id) {
            this.nombreSensor = this.dispositivoSinRepetir[j].nombre;
            this.nombreUbicacion = this.dispositivoSinRepetir[j].ubicacion;
            console.log(
              "se envia: " + this.nombreSensor + " - " + this.nombreUbicacion
            );
            break;
          }
        }

        this.router.navigate([
          "/grafico/",
          id,
          this.valorObtenido,
          this.nombreSensor,
          this.nombreUbicacion /*,this.estadoSensor*/,
        ]);
      });
  }
}
