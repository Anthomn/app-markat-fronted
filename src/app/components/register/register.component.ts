import { Stores } from './../../models/stores';
import { StoresService } from './../../services/stores/stores.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  myForm!: FormGroup;
  Stores!: Stores[];
  email!: string;
  esValido!: boolean;

  constructor(private formbuilder: FormBuilder, private storeService: StoresService, private router: Router) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.esValido = true;
  }

  reactiveForm(): void{
    this.myForm = this.formbuilder.group({
      storeName: ["",[Validators.required]],
      noRuc: ["",[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
      noPhone: ["",[Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
      ownerName: ["",[Validators.required]],
      ownerLastName: ["",[Validators.required]],
      ownerPhoto: ["",[Validators.required]],
      ownerDni: ["",[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      email: ["",[Validators.required,Validators.email]],
      password: ["",[Validators.required, Validators.minLength(8)]],
      city: ["",[Validators.required]]
    })
  } 
  getStores() {
    this.storeService.getStores().subscribe(
      (data: Stores[]) => {
        this.Stores = data;
      }
    )
  }

  addStore(): void {
    const store: Stores = {
      id: 999999,
      storeName: this.myForm.get("storeName")!.value,
      noRuc: this.myForm.get("noRuc")!.value,
      noPhone: this.myForm.get("noPhone")!.value,
      ownerName: this.myForm.get("ownerName")!.value,
      ownerLastName: this.myForm.get("ownerLastName")!.value,
      ownerPhoto: this.myForm.get("ownerPhoto")!.value,
      ownerDni: this.myForm.get("ownerDni")!.value,
      email: this.myForm.get("email")!.value,
      password: this.myForm.get("password")!.value,
      city: this.myForm.get("city")!.value,
    }

    this.storeService.getStores().subscribe(
      (data: Stores[]) => {
        let auxstore= data.find(x => x.email == store.email);
        if (auxstore) {
          this.esValido=false;

        }else{
          this.storeService.addStore(store).subscribe({
      
            next: (data) => {
              this.router.navigate(["/login"]);
            },
            error: (err) => {
              console.log(err);
            }
          })
        }
      }

    );
    this.esValido=true;

  }

}

