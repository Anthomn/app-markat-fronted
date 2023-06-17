import { StocksService } from './../../services/stocks/stocks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock';


@Component({
  selector: 'app-new-edit-product',
  templateUrl: './new-edit-product.component.html',
  styleUrls: ['./new-edit-product.component.css']
})
export class NewEditProductComponent implements OnInit {
  checked = false;
  idStore!: number;
  stock!: Stock;
  noUnits!: number;
  dateExpiration!: Date;
  pricePerUnit!: number;
  
  constructor(private activated: ActivatedRoute, private stockService: StocksService, private router: Router) {}
  
  ngOnInit(): void {
    this.idStore = this.activated.snapshot.params['id'];
    let id_stock = this.activated.snapshot.params['id_stock'];
    this.stockService.getStockById(id_stock).subscribe(
      (data: Stock) => {
        this.stock = data;
        this.noUnits = data.noUnits;
        this.dateExpiration = data.dateExpiration;
        this.pricePerUnit = data.pricePerUnit;
      }
    )
  }

  save(){
 
    let stock: Stock = {
      id: this.stock.id,
      noUnits: this.noUnits,
      pricePerUnit: this.pricePerUnit,
      dateExpiration: this.dateExpiration,
      dateShopping: this.stock.dateExpiration,
      product: this.stock.product,
      store: this.stock.store
    }

    if (this.noUnits >= 0){

      this.stockService.updateStock(stock).subscribe({
        next: (data: Stock) => {
          this.router.navigate(['dashboard/'+this.idStore+'/inventario']);
        },
        error: e => {
          console.log('error update: ', e);
        }
      })

    }
  }
}
