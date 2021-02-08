import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "pipePersonalizado",
})
export class PipePersonalizadoPipe implements PipeTransform {
  transform(value: unknown, estado: string): string {
    var mensaje: string;
    if (estado) {
      mensaje = "[✓] ABIERTO";
    } else {
      mensaje = "[X] CERRADO";
    }
    return mensaje;
  }
}
