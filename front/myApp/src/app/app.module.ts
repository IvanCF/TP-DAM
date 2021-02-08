import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'; // este es para que funciones las peticiones al API
import { HighchartsChartModule } from 'highcharts-angular';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//servicios
import {EnlaceAPIService} from './services/enlaceApi.service';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PipePersonalizadoPipe } from './pipes/pipe-personalizado.pipe';





@NgModule({
  declarations: [AppComponent, PipePersonalizadoPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    EnlaceAPIService,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    
  ],
  bootstrap: [AppComponent]
 

})
export class AppModule {}
