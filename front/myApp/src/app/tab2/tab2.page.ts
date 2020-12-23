
//correr antes npm install --save highcharts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page  {


  public data2:any;
  public codigoDispo:Number;
  public medidaDispositivo:any;

  constructor(private Route: ActivatedRoute,private http:HttpClient) { 

    

   this.medidaDispositivo=JSON.parse(this.Route.snapshot.paramMap.get('id'));
  
    console.log(this.medidaDispositivo);

     }


    
     
      
    
  
  }

  
