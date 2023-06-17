import { Stores } from './../../models/stores';
import { StoresService } from '../../services/stores/stores.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
  idStore!: number;
  store!: Stores;

  constructor(private activetedRoute: ActivatedRoute,
    private StoresService: StoresService) { }

  ngOnInit(): void {
    this.idStore = this.activetedRoute.snapshot.params['id'];
    this.StoresService.getStore(this.idStore).subscribe(
      (data: Stores) => {
        this.store= data;
      }
    )
  }


}
