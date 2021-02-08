import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EnlaceAPIService } from "../services/enlaceApi.service";
import { PipePersonalizadoPipe } from "../pipes/pipe-personalizado.pipe";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  public codigo: number;
  public dispositivoLog: any;

  constructor(
    public enlaceAPI: EnlaceAPIService,
    private Route: ActivatedRoute
  ) {
    this.codigo = Number(this.Route.snapshot.paramMap.get("id"));

    this.enlaceAPI
      .getListaLogsById(this.codigo)
      .subscribe((listaDispositivos2) => {
        console.log(listaDispositivos2);
        this.dispositivoLog = listaDispositivos2;
      });
  }

  ngOnInit() {}
}
