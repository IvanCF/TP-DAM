import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class EnlaceAPIService {
  data: any;
  data2: any;

  constructor(private http: HttpClient) {
    console.log("iniciando servicio de conexion a la API");
  }
  /********************************************************** */
  getListarDispositivos() {
    return (this.data2 = this.http.get("http://localhost:3001/dispositivos/"));
  }
  /********************************************************** */
  getListarDispositivos_mas_detalle() {
    return (this.data = this.http.get(
      "http://localhost:3001/dispositivosCompletos/"
    ));
  }
  /********************************************************** */
  obtenerValorMasActualById(id: number) {
    return (this.data = this.http.get(
      "http://localhost:3001/valorMasActualDispositivo/" + id
    ));
  }
  /********************************************************** */
  registrarLogElectrovalvula(
    estado: string,
    fecha: string,
    electrovalvulaId: number
  ) {
    return (this.data = this.http.get(
      "http://localhost:3001/addLogDispositivo/" +
        estado +
        "/" +
        fecha +
        "/" +
        electrovalvulaId
    ));
  }
  /********************************************************** */
  registrarMediciones(fecha: string, valor: number, dispositivoId: number) {
    return (this.data = this.http.get(
      "http://localhost:3001/addMediciones/" +
        fecha +
        "/" +
        valor +
        "/" +
        dispositivoId
    ));
  }
  /********************************************************** */
  getListaLogsById(id: number) {
    return (this.data = this.http.get("http://localhost:3001/listaLogs/" + id));
  }

  /********************************************************** */
  getListaLogs() {
    return (this.data = this.http.get(
      "http://localhost:3001/listaLogsCompleta/"
    ));
  }
}
