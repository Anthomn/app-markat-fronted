import { VentasService } from './../../services/sales/ventas.service';
import { Producto } from './../../models/producto';
import { ProductosService } from './../../services/products/productos.service';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/clients/cliente.service';
import { Component, OnInit } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.css'],
})
export class FinanzasComponent implements OnInit {
  id!: number;
  productos: any[] = [];
  clientes: any[] = [];
  constructor(private clienteService: ClienteService, private activated: ActivatedRoute, private producService: ProductosService,
    private saleService: VentasService) { }

  ngOnInit(): void {
    this.id = this.activated.snapshot.params['id'];
    let fin = new Date();
    fin.setDate(fin.getDate() - 7);
    let inicio = new Date();
    this.saleService.getResporteSemanal(this.id, fin, inicio).subscribe(
      (data: any) => {
        console.log(data);
        let arr: any[] = [['Dia', 'Soles', { role: 'style' }]];
        for (let i = 0; i < data.length; i++) {
          arr.push([new Date(data[i][0]).toLocaleDateString('es-us', { weekday: 'short' }) + '-' +
            new Date(data[i][0]).getDate(), data[i][1], this.generarColor()]);
        }
        google.charts.load('current', { packages: ['corechart'] });
        this.buildChart(arr);
      }
    )
    this.getClientes();
    this.getProductosMasVendidos();
  }

  generarColor() {
    let valores = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let color = '';
    for (let i = 0; i < 6; i++) {
      let num = Math.floor(Math.random() * 16);
      color += '' + valores[num];
    }
    return color;
  }
  buildChart(arr: any) {
    var func = (chart: any) => {
      var data = new google.visualization.arrayToDataTable(arr);
      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
        {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation"
        },
        2]);

      var options = {
        title: "Ingreso semanal",
        width: 1200,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "top" },
      };
      chart().draw(view, options);
    }
    var chart = () => new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    var callback = () => func(chart);
    google.charts.setOnLoadCallback(callback);
  }

  getClientes() {
    this.clienteService.getClientesFrecuentes(this.id).subscribe(
      (data: any) => {
        this.clientes = data;
      }
    )
  }
  getProductosMasVendidos() {
    this.producService.getProductosMasVendios(this.id).subscribe(
      (data: any) => {
        this.productos = data;
      }
    )
  }
}
