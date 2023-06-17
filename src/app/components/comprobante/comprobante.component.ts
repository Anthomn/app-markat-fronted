import { ActivatedRoute } from '@angular/router';
import { VentasService } from './../../services/sales/ventas.service';
import { Ventas } from './../../models/ventas';
import { DetalleService } from './../../services/detalle.service';
import { DetalleVenta } from './../../models/detalleVenta';
import { Stores } from './../../models/stores';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.css'],
})
export class ComprobanteComponent implements OnInit {
  idVenta!: number;
  sale!: Ventas;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private ventasService: VentasService  ) {}

  ngOnInit(): void {
    this.idVenta = this.ActivatedRoute.snapshot.params['id_venta'];

    this.ventasService.getVenta(this.idVenta).subscribe((data: Ventas) => {
      this.sale = data;
      console.log(data);
    });
  }
}
