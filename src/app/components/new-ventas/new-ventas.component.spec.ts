import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVentasComponent } from './new-ventas.component';

describe('NewVentasComponent', () => {
  let component: NewVentasComponent;
  let fixture: ComponentFixture<NewVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
