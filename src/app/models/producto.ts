import { Supplier } from './supplier';
import { Stock } from './stock';
export interface Producto {
    id: number,
    productName: string,
    brand: string,
    productDescription: string,
    img: string,
    type_name: string,
    precio: number,
    supplier: Supplier
}