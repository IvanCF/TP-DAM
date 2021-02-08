//correr antes npm install --save highcharts
import { Component, OnInit } from "@angular/core";
//import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { EnlaceAPIService } from "../services/enlaceApi.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  public sensor: string;
  public ubicacion: string;
  public codigoDispo: Number;
  public medidaDispositivo: any;
  public detalle_dispositivo: any;
  public estadoSeleccionado: boolean = false;

  constructor(
    public enlaceAPI: EnlaceAPIService,
    private Route: ActivatedRoute
  ) {
    this.codigoDispo = Number(this.Route.snapshot.paramMap.get("id"));

    this.enlaceAPI
      .getListarDispositivos_mas_detalle()
      .subscribe((listaDispositivos) => {
        this.detalle_dispositivo = listaDispositivos;
        this.filtrarDatos();
      });
  }

  filtrarDatos() {
    var index: Number;
    var ArrayDetalle = new Array();
    for (var i in this.detalle_dispositivo) {
      if (this.detalle_dispositivo[i].dispositivoId == this.codigoDispo) {
        ArrayDetalle.push(this.detalle_dispositivo[i]);
        this.sensor = this.detalle_dispositivo[i].nombre;
        this.ubicacion = this.detalle_dispositivo[i].ubicacion;
      }
    }

    var dato = JSON.stringify(ArrayDetalle);

    console.log("filtro: " + dato);
    this.medidaDispositivo = JSON.parse(dato);
  }
}
