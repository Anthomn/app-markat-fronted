import { StoresService } from './../../services/stores/stores.service';
import { Stores } from './../../models/stores';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StocksService } from './../../services/stocks/stocks.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from 'src/app/models/stock';



@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})



export class InventarioComponent implements OnInit {
  displayedColumns: string[] = ['producto', 'marca', 'descripcion', 'stock', 'precio', 'imagen', 'accion'];
  dataSource = new MatTableDataSource<Stock>();
  stock: Stock[] = [];
  idStore!: number;
  store!: Stores;

  constructor(private stockService: StocksService, private ActivatedRoute: ActivatedRoute, private router: Router, private snackbar: MatSnackBar,private StoresService: StoresService) { }

  ngOnInit(): void {
    this.idStore = this.ActivatedRoute.snapshot.params['id'];
    this.stockService.getStock(this.idStore).subscribe(
      (data: Stock[]) => {
        this.dataSource = new MatTableDataSource(data);
      }
    )

    this.StoresService.getStore(this.idStore).subscribe(
      (data: Stores) => {
        this.store= data;
      }
    )

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteStock(id: number):void{
    this.stockService.deleteStock(id).subscribe({
      next: (data) => {
        this.snackbar.open("El stock se eliminó correctamente","OK",{duration:3000});
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
  exportExcel(){
    this.stockService.exportStocks(this.idStore).subscribe(
        (data: any) => {
          let file = new Blob([data],{
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          });
          let fileURL = URL.createObjectURL(file);
          var anchor = document.createElement('a');
          anchor.download="stock_report.xlsx";
          anchor.href=fileURL;
          anchor.click();
        },
        (error: any) => {
          console.log("No se pudo exportar");
        }
    );
  }
  
}
