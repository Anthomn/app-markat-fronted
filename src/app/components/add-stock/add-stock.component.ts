import { Supplier } from './../../models/supplier';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoresService } from './../../services/stores/stores.service';
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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

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
  formProduct!: FormGroup;
  abrir = false;

  minDate: Date;


  constructor(private formBuilder: FormBuilder,
              private activated: ActivatedRoute, private productoService: ProductosService,
              private stockService: StocksService, private router: Router, private snack: MatSnackBar) {

    /*Correcciones*/
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDay();
    const currentMonth = new Date().getMonth();

    this.minDate = new Date(currentYear, currentMonth, currentDay + 12);
  }

  ngOnInit(): void {
    this.id = this.activated.snapshot.params['id'];
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''), map(value => this._filter(value || '')),
    );
    this.reactiveForm();
    this.getProductos();
    this.loadFormProduct();
  }

  loadFormProduct() {
    this.formProduct = this.formBuilder.group(
      {
        productoNombre: ['', [Validators.required]],
        productoMarca: ['', [Validators.required]],
        productoDescripcion: ['', [Validators.required]],
        productoImg: ['', [Validators.required]]
      }

    )
  }
  close() {
    this.abrir = false;
  }

  _abrir() {
    this.abrir = true;
  }
  getProductos() {
    this.productoService.getProductos().subscribe(
      (data: Producto[]) => {
        this.options = data;
      }
    )
  }
  conseguirProducto(data: any) {
    this.producto = data;
  }
  insertarProducto() {
    let suplier: Supplier = {
      id: 1
    }
    let producto: Producto = {
      id: 0,
      productName: this.formProduct.get('productoNombre')?.value,
      brand: this.formProduct.get('productoMarca')?.value,
      productDescription: this.formProduct.get('productoDescripcion')?.value,
      img: this.formProduct.get('productoImg')?.value,
      type_name: '',
      precio: 0,
      supplier: suplier
    }

    this.productoService.addProducto(producto).subscribe(
      {
        next: (data: Producto) => {
          this.snack.open('El producto se ha agregado correctamente: ', 'OK', { duration: 3000 });
          this.close();
          this.formProduct.get('productoNombre')?.setValue(' ');
          this.formProduct.get('productoDescripcion')?.setValue(' ');
          this.formProduct.get('productoMarca')?.setValue(' ');
          this.formProduct.get('productoImg')?.setValue(' ');
          this.getProductos();
        }
      }
    )
  }
  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.productName.toLowerCase().includes(filterValue));
  }
  reactiveForm() {
    this.myform = this.formBuilder.group({
      dateExpiration: ["", [Validators.required]],
      dateShopping: ["", [Validators.required]],
      noUnits: ["", [Validators.required]],
      pricePerUnit: ["", [Validators.required]],
    })
  }


  addStock() {

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

    let stock: Stock = {
      id: 999999,
      noUnits: this.myform.get('noUnits')?.value,
      pricePerUnit: this.myform.get('pricePerUnit')?.value,
      dateExpiration: this.myform.get('dateExpiration')?.value,
      dateShopping: this.myform.get('dateShopping')?.value,
      product: this.producto,
      store: _store

    }

    this.stockService.addStock(stock).subscribe({

      next: (data: Stock) => {
        // console.log('aÃ±adiendo stock: ', data);
        this.router.navigate(['dashboard/' + this.id + '/inventario']);
      },
      error: e => console.log('error venta: ' + e)
    });

  }
}
