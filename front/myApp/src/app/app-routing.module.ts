import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "grafico/:id/:valor/:nombre/:ubicacion",
    loadChildren: () =>
      import("./graficoSensor/grafico/grafico.module").then(
        (m) => m.GraficoPageModule
      ),
  } /*,
  {
    path: 'reportelog',
    loadChildren: () => import('./reporteLog/reportelog/reportelog.module').then( m => m.ReportelogPageModule)
  }
*/,
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
