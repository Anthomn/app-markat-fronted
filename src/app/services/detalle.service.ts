import { HttpClient } from '@angular/common/http';
import { DetalleVenta } from './../models/detalleVenta';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  constructor(private http: HttpClient) { }

 getDetalleVenta(id: number){
   return this.http.get<DetalleVenta[]>('http://localhost:8080/api/sales/' + id +'/saledetails');
  }

  addDetalle(detalleVenta: DetalleVenta[]) {
    return this.http.post<DetalleVenta[]>('http://localhost:8080/api/details', detalleVenta);
  }

    /*Buscar detalle de venta por ID de Venta*/
    getSaleDetailsByIdSale(id: number) {
      return this.http.get<DetalleVenta>('http://localhost:8080/api/sales/'+id +'/saledetails');
    }
}
