/*import { Stores } from './../../models/stores';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoresService {


  constructor(private http: HttpClient) { }

  getStores() {
    return this.http.get<Stores[]>('http://localhost:8080/api/stores');
  }

  getStore(id: number) {
    return this.http.get<Stores>(`http://localhost:8080/api/stores/${id}`);
  }

  addStore(Stores:Stores){
    return this.http.post<Stores>("http://localhost:8080/api/stores",Stores);
  }


} */


import { Stores } from './../../models/stores';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private http: HttpClient) { }

  getStores(){
    return this.http.get<Stores[]>('http://localhost:8080/api/stores');
  }

  getStore(id: number){
    return this.http.get<Stores>('http://localhost:8080/api/stores/'+id);
  }

  addStore(store:Stores){
    return this.http.post<Stores>('http://localhost:8080/api/stores',store);
  }

  deleteStore(id: number){
    return this.http.delete<Stores>('http://localhost:8080/api/stores/'+id);
  }
}