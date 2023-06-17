import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

/* Agregado de Angular Material*/
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; /*Para los formularios*/
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { RecoverPwComponent } from './components/recover-pw/recover-pw.component';
import { RecoverCodeComponent } from './components/recover-code/recover-code.component';
import { ResetPwComponent } from './components/reset-pw/reset-pw.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; /*Importante*/
/*Agregado*/
import { HttpClientModule } from '@angular/common/http';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { FinanzasComponent } from './components/finanzas/finanzas.component';
import { NewEditProductComponent } from './components/new-edit-product/new-edit-product.component';
import { NewVentasComponent } from './components/new-ventas/new-ventas.component';
import { NavLandingComponent } from './components/nav-landing/nav-landing.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ComprobanteComponent } from './components/comprobante/comprobante.component';
import { AddStockComponent } from './components/add-stock/add-stock.component'

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    RecoverPwComponent,
    RecoverCodeComponent,
    ResetPwComponent,
    DashboardComponent,
    InventarioComponent,
    ClientesComponent,
    VentasComponent,
    FinanzasComponent,
    NewEditProductComponent,
    NewVentasComponent,
    NavLandingComponent,
    ComprobanteComponent,
    AddStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    /*Agregado de Angular Maaterial*/
    MatGridListModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    GoogleChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
