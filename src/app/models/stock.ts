import { Stores } from './stores';
import { Producto } from './producto';
export interface Stock{
    id:number;
    noUnits:number;
    pricePerUnit: number;
    dateExpiration: Date;
    dateShopping: Date;
    product: Producto;
    store: Stores;
}