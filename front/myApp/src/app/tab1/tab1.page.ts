import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  data: any;
  data2: any;
  dispositivos: any;
  
  dispositivoSinRepetir:any;

  constructor(private http:HttpClient,private router:Router) {

    this.data=http.get('http://localhost:3001/dispositivosCompletos/');
    this.data.subscribe((listaDispositivos)=>{
      console.log(listaDispositivos);
      this.dispositivos=listaDispositivos;
     
    });
    

    this.data2=http.get('http://localhost:3001/dispositivos/');
    this.data2.subscribe((listaDispositivos2)=>{
      console.log(listaDispositivos2);
      this.dispositivoSinRepetir=listaDispositivos2;
     
    });
  }

  
  enviarCodigo(id:Number)
  {
    var index:Number;
    var ArrayDetalle=new Array();
    for(var i in this.dispositivos)
    {
        if(this.dispositivos[i].dispositivoId==id)
        {
           ArrayDetalle.push(this.dispositivos[i]);
        }
    }


  var datos=JSON.stringify(ArrayDetalle);
  this.router.navigate(['/tabs/tab2/',datos]);
  console.log(datos);

  }
 
   
  
  

}
