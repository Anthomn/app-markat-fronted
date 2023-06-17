import { Ventas } from './ventas';
import { Producto } from './producto';
export interface DetalleVenta {
    id: number,
    priceUnit: number,
    noUnits: number,
    subtotalPrice: number,
    product: Producto,
    sale: Ventas
}