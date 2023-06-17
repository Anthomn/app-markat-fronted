import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from 'src/app/models/stock';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http: HttpClient) { }

  getStock(idStore: number){
    return this.http.get<Stock[]>('http://localhost:8080/api/stocks/list/'+idStore);
  }

  getStockById(id: number){
    return this.http.get<Stock>('http://localhost:8080/api/stocks/'+id);
  }

  addStock(stock: Stock){
    return this.http.post<Stock>('http://localhost:8080/api/stocks',stock);
  }

  updateStock(stock: Stock){
    return this.http.put<Stock>('http://localhost:8080/api/stocks',stock);
  }

  deleteStock(id: number){
    return this.http.delete<Stock[]>('http://localhost:8080/api/stocks/'+id);
  }

/*Necesita stock*/
  getNeedStock(id: number) {
    return this.http.get<Stock[]>('http://localhost:8080/api/top3/stocks/' +id );
  }

   exportStocks(id: Number){
    return this.http.get('http://localhost:8080/api/stocks/export/excel/'+id,{
      responseType: "blob"
    });
  }

}
