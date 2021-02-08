import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { EnlaceAPIService } from "../../services/enlaceApi.service";
import { ToastController } from "@ionic/angular";

declare var require: any;
require("highcharts/highcharts-more")(Highcharts);
require("highcharts/modules/solid-gauge")(Highcharts);

@Component({
  selector: "app-grafico",
  templateUrl: "./grafico.page.html",
  styleUrls: ["./grafico.page.scss"],
})
export class GraficoPage implements OnInit {
  private valorObtenido: number = 0;
  public myChart;
  private chartOptions;
  public valorDispo: number = 0;
  public nuevo_valor: number = 0;
  public detalle_dispositivo: any;
  public valorNombre;
  public valorUbicacion;
  public codigoDispo: number;
  public mensajeBoton: boolean = false; //inicialmente esta cerrado
  public estadoSensor: string;
  public dispositivoLog: any;

  constructor(
    public enlaceAPI: EnlaceAPIService,
    private Route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    public toastController: ToastController
  ) {
    this.codigoDispo = Number(this.Route.snapshot.paramMap.get("id"));
    this.valorDispo = Number(this.Route.snapshot.paramMap.get("valor"));
    this.valorNombre = this.Route.snapshot.paramMap.get("nombre");
    this.valorUbicacion = this.Route.snapshot.paramMap.get("ubicacion");

    /************************** */

    this.enlaceAPI.getListaLogs().subscribe((listaDispositivos3) => {
      this.dispositivoLog = listaDispositivos3;
      /*************************obtener el estado */
      for (var k in this.dispositivoLog) {
        if (this.dispositivoLog[k].electrovalvulaId == this.codigoDispo) {
          this.estadoSensor = this.dispositivoLog[k].apertura;
        }
      }

      /*********************************/

      console.log(
        "valor llega: " +
          this.codigoDispo +
          " - " +
          this.valorDispo +
          " - " +
          this.valorNombre +
          " - " +
          this.valorUbicacion
      );
      this.valorObtenido = this.valorDispo;

      if (this.estadoSensor == "open") {
        this.mensajeBoton = true;
      } else {
        this.mensajeBoton = false;
      }

      setTimeout(() => {
        console.log("Cambio el valor del sensor");

        //this.valorObtenido=20;/************************ */
        //llamo al update del chart para refrescar y mostrar el nuevo valor
        this.myChart.update({
          series: [
            {
              name: "kPA",
              data: [this.valorObtenido],
              tooltip: {
                valueSuffix: " kPA",
              },
            },
          ],
        });
      }, 500);
      /******************************** */
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.generarChart();
  }

  enviarCodigo() {
    this.router.navigate(["/tabs/tab2/", this.codigoDispo]);
  }

  verRegistroLog() {
    this.router.navigate(["/tabs/tab3/", this.codigoDispo]);
  }

  async activarAperturaElectrovalvula() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "¡Alerta!",
      message: "¿Esta seguro de abrir la <strong>electrovalvula</strong>?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Operación cancelada");
          },
        },
        {
          text: "Si",

          handler: () => {
            console.log("Confirm Ok");

            this.registrarLogElectrovalvula("open");
          },
        },
      ],
    });

    alert.present();
  }

  async desactivarAperturaElectrovalvula() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Operación de Cierre",
      message:
        "Ingrese el nuevo valor a simular con el cual se cerrará la <strong>electrovalvula</strong>:",
      inputs: [
        {
          name: "valor",
          type: "text",
          placeholder: "Nuevo Valor",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "OK",
          handler: (data) => {
            console.log("Confirm Ok");

            //registra en la tabla medicion
            this.registrarMedicion(data.valor);

            //registra en la tabla log
            this.registrarLogElectrovalvula("close");
          },
        },
      ],
    });

    alert.present();
  }

  registrarMedicion(dato: number) {
    console.log(dato);
    var fechaHora = this.obtenerHora_Fecha();
    console.log("se registra Log: " + fechaHora);

    this.enlaceAPI
      .registrarMediciones(fechaHora, dato, this.codigoDispo)
      .subscribe((respuestaApi) => {
        console.log("respuesta Api: " + respuestaApi);

        this.mensajeBoton = false;
      });
  }

  obtenerHora_Fecha() {
    var hoy = new Date();
    var fecha =
      hoy.getUTCFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    var fechaHora = fecha + " " + hora;
    return fechaHora;
  }

  registrarLogElectrovalvula(val: string) {
    var fechaHora = this.obtenerHora_Fecha();
    console.log("se registra Log: " + fechaHora);

    this.enlaceAPI
      .registrarLogElectrovalvula(val, fechaHora, this.codigoDispo)
      .subscribe((respuestaApi) => {
        console.log("respuesta Api: " + respuestaApi);
        this.confirmacionToast();

        //
        this.mensajeBoton = true;

        this.router.navigate(["/tabs/tab1"]);
      });
  }

  async confirmacionToast() {
    const toast = await this.toastController.create({
      message: "Se registro un nuevo Log!.",
      color: "primary",
      duration: 2000,
    });
    toast.present();
  }

  generarChart() {
    this.chartOptions = {
      chart: {
        type: "gauge",
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: /*'Sensor N° 1'*/ this.valorNombre,
      },

      credits: { enabled: false },

      pane: {
        startAngle: -150,
        endAngle: 150,
      },
      // the value axis
      yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: "auto",
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: "inside",
        minorTickColor: "#666",

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: "inside",
        tickLength: 10,
        tickColor: "#666",
        labels: {
          step: 2,
          rotation: "auto",
        },
        title: {
          text: /* 'kPA'*/ this.valorUbicacion,
        },
        plotBands: [
          {
            from: 0,
            to: 10,
            color: "#55BF3B", // green
          },
          {
            from: 10,
            to: 30,
            color: "#DDDF0D", // yellow
          },
          {
            from: 30,
            to: 100,
            color: "#DF5353", // red
          },
        ],
      },
      series: [
        {
          name: "kPA",
          data: [this.valorObtenido],
          tooltip: {
            valueSuffix: " kPA",
          },
        },
      ],
    };

    this.myChart = Highcharts.chart("highcharts", this.chartOptions);
  }
}
