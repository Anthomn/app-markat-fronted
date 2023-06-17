import { DetalleVenta } from './detalleVenta';
import { Stores } from './stores';
import { Cliente } from './cliente';
export interface Ventas {
    id: number;
    totalPrice: number;
    client: Cliente,
    dateSale: Date,
    sellType: string,
    noVoucher: string,
    store: Stores,
    saleDetails: DetalleVenta[]
}
