import { Stores } from './../../models/stores';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StoresService } from '../../services/stores/stores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  hide = true;
  myform!: FormGroup;
  Stores!: Stores[];
  email!: string;
  password!: string;
  esValido!: boolean;
  id!: number;
  
  constructor(private formBuilder: FormBuilder,
    private StoresService: StoresService,
    private router: Router) { }

  ngOnInit(): void {
  this.loadMyForm();
    this.getStores();
    this.esValido = true;}



  loadMyForm() {
    this.myform = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email, Validators.max(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]]
    })
  }

  getStores() {
    this.StoresService.getStores().subscribe(
      (data: Stores[]) => {
        this.Stores = data;
      }
    )
  }

  verificarUsuario(): void {
    this.email = this.myform.get('email')?.value;
    this.password = this.myform.get('password')?.value;
    this.StoresService.getStores().subscribe(
      (data: Stores[]) => {
        let auxstore= data.find(x => x.email == this.email && x.password == this.password);
        if (auxstore) {
          this.router.navigate(["dashboard/" + auxstore.id]);
        }
      }
    );
    this.esValido = false;
  }
  }





