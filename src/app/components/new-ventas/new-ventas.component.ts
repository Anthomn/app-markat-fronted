import { StocksService } from './../../services/stocks/stocks.service';
import { Stores } from './../../models/stores';
import { Stock } from './../../models/stock';
import { DetalleService } from './../../services/detalle.service';
import { Ventas } from './../../models/ventas';
import { DetalleVenta } from './../../models/detalleVenta';
import { VentasService } from './../../services/sales/ventas.service';
import { ClienteService } from 'src/app/services/clients/cliente.service';
import { Cliente } from './../../models/cliente';
import { ProductosService } from './../../services/products/productos.service';
import { Producto } from './../../models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';


@Component({
  selector: 'app-new-ventas',
  templateUrl: './new-ventas.component.html',
  styleUrls: ['./new-ventas.component.css']
})
export class NewVentasComponent implements OnInit {
  cantidad!: number;
  id!: number;
  myform!: FormGroup;
  options: Producto[] = [];
  filteredOptions!: Observable<Producto[]>;
  myControl = new FormControl('');
  producto!: Producto;
  detalles: DetalleVenta[] = [];
  _venta!: Ventas;
  stock!: Stock;
  isValid = false;

  constructor(private formBuilder: FormBuilder,
    private activated: ActivatedRoute, private productoService: ProductosService,
    private clienteService: ClienteService, private ventaService: VentasService, private detalleService: DetalleService,
    private router: Router, private stockService: StocksService) { }

  ngOnInit(): void {
    this.id = this.activated.snapshot.params['id'];
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''), map(value => this._filter(value || '')),
    );
    this.reactiveForm();
    this.getProductos();
  }

  getProductos() {
    this.productoService.getProductByIdStore(this.id).subscribe(
      (data: Producto[]) => {
        this.options = data;
      }
    )
  }
  conseguirProducto(data: any) {
    this.producto = data;
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.productName.toLowerCase().includes(filterValue));
  }
  reactiveForm() {
    this.myform = this.formBuilder.group({

      dni: ["", [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(8), Validators.maxLength(8)]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      clientAddress: ["", [Validators.required]],
      noPhone: ["", [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(9), Validators.maxLength(9)]],

      boleta: ["", [Validators.required]],
      fecha: ["", [Validators.required]],
      cantidad: ['', [Validators.required]],
      precio: ['', [Validators.required]]
    })
  }

  addLista() {

    let _precio = this.myform.get('precio')?.value;
    let _cantidad = this.myform.get('cantidad')?.value;
    let detalle: DetalleVenta = {
      id: 99999,
      priceUnit: _precio,
      noUnits: _cantidad,
      subtotalPrice: _precio * _cantidad,
      product: this.producto,
      sale: this._venta
    }
    this.detalles.push(detalle);
  }

  total() {
    let _sum = 0;
    for (let i = 0; i < this.detalles.length; i++) {
      _sum += this.detalles[i].subtotalPrice;
    }
    return _sum;
  }
  quitar(idx: number) {
    this.detalles.splice(idx, 1);
  }

  addVenta() {

    this.clienteService.getClientes(this.id).subscribe(
      (data: Cliente[]) => {

        let _cliente: any = data.find(x => x.dni == this.myform.get('dni')?.value);
        let _dni = this.myform.get('dni')?.value;


        let _store: Stores = {
          id: this.id,
          storeName: '',
          noRuc: '',
          noPhone: '',
          ownerName: '',
          ownerLastName: '',
          ownerPhoto: '',
          ownerDni: '',
          email: '',
          password: '',
          city: ''
        }

        if (_cliente) {
          let venta: Ventas = {
            id: 99999,
            totalPrice: this.total(),
            client: _cliente,
            dateSale: new Date(),
            sellType: 'Boleta',
            noVoucher: _dni,
            store: _store,
            saleDetails: []
          }
          this.ventaService.addVenta(venta).subscribe({
            next: (data: Ventas) => {
              console.log('añadiendo venta: ', data);
              for (let i = 0; i < this.detalles.length; i++) {
                this.detalles[i].sale = data;
              }
              this.detalleService.addDetalle(this.detalles).subscribe({
                next: (data: DetalleVenta[]) => {
                  this.router.navigate(['dashboard/' + this.id + '/ventas']);
                },
                error: e => console.log('error detalle: ', e)
              })
            },
            error: e => console.log('error venta: ' + e)
          })

        } else {
          let cliente: Cliente = {
            id: 999999,
            firstName: this.myform.get('firstName')?.value,
            lastName: this.myform.get('lastName')?.value,
            dni: this.myform.get('dni')?.value,
            clientAddress: this.myform.get('clientAddress')?.value,
            noPhone: this.myform.get('noPhone')?.value,
            photo: 'https://i.postimg.cc/5NS9Kb8K/pngtree-cyber-man-icon-isolated-on-abstract-background-png-image-1779361.jpg',
          }
          console.log("entro");
          this.clienteService.addCliente(cliente).subscribe({
            next: (data: Cliente) => {
              let venta: Ventas = {
                id: 99999,
                totalPrice: this.total(),
                client: data,
                dateSale: new Date(),
                sellType: 'Boleta',
                noVoucher: _dni,
                store: _store,
                saleDetails: []
              }
              this.ventaService.addVenta(venta).subscribe({
                next: (data: Ventas) => {
                  console.log('añadiendo venta: ', data);
                  for (let i = 0; i < this.detalles.length; i++) {
                    this.detalles[i].sale = data;
                  }
                  this.detalleService.addDetalle(this.detalles).subscribe({
                    next: (data: DetalleVenta[]) => {
                      this.router.navigate(['dashboard/' + this.id + '/ventas']);
                    },
                    error: e => console.log('error detalle: ', e)
                  })
                },
                error: e => console.log('error venta: ' + e)
              })
            }
          })
        }
      }
    )

  }

}
