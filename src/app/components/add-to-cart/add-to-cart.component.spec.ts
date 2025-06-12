import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartComponent } from './add-to-cart.component';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../services/cart.service';
import { of } from 'rxjs';
import { Dessert } from '../../../model/dessert.interface';

describe('AddToCartComponent', () => {
  let component: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;
  let cartService: jasmine.SpyObj<CartServiceService>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartServiceService', [
      'add',
      'remove',
    ]);
    cartServiceSpy.cartItems$ = of([]);
    cartServiceSpy.totalQuantity$ = of(0);
    cartServiceSpy.totalPrice$ = of(0);
    await TestBed.configureTestingModule({
      imports: [AddToCartComponent, CommonModule],
      providers: [{ provide: CartServiceService, useValue: cartServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddToCartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(
      CartServiceService
    ) as jasmine.SpyObj<CartServiceService>;
    component.product = {
      id: 1,
      name: 'Test Dessert',
      category: 'Cake',
      price: 5.5,
      image: {
        thumbnail: 'thumbnail.jpg',
        mobile: 'mobile.jpg',
        tablet: 'tablet.jpg',
        desktop: 'desktop.jpg',
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add product to cart', () => {
    component.addToCart();
    expect(cartService.add).toHaveBeenCalledWith(component.product, 1);
  });

  it('should increase product quantity', () => {
    component.inCart = true;
    component.increaseProductItem();
    expect(cartService.add).toHaveBeenCalledWith(component.product, 1);
  });

  it('should decrease product quantity', () => {
    component.inCart = true;
    component.quantity = 2;
    component.decreaseProductItem();
    expect(cartService.remove).toHaveBeenCalledWith(component.product, 1);
  });

  it('should remove product when quantity is 1', () => {
    component.inCart = true;
    component.quantity = 1;
    component.decreaseProductItem();
    expect(cartService.remove).toHaveBeenCalledWith(component.product, 1);

    expect(component.inCart).toBeFalse();
  });
});
