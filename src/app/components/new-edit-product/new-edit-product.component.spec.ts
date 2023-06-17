import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditProductComponent } from './new-edit-product.component';

describe('NewEditProductComponent', () => {
  let component: NewEditProductComponent;
  let fixture: ComponentFixture<NewEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
