import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CommonModule } from '@angular/common';
import { OrderConfirmationComponent } from '../order-confirmation/order-confirmation.component';
import { CartServiceService } from '../../services/cart.service';
import { of } from 'rxjs';
import { Dessert } from '../../../model/dessert.interface';
import { CartItem } from '../../../model/cartItem.interface';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartServiceService>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartServiceService', [
      'remove',
    ]);
    const testProduct: Dessert = {
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
    cartServiceSpy.cartItems$ = of([{ product: testProduct, quantity: 1 }]);
    cartServiceSpy.totalQuantity$ = of(1);
    cartServiceSpy.totalPrice$ = of(5.5);

    await TestBed.configureTestingModule({
      imports: [CartComponent, OrderConfirmationComponent, CommonModule],
      providers: [{ provide: CartServiceService, useValue: cartServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(
      CartServiceService
    ) as jasmine.SpyObj<CartServiceService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove item from cart', () => {
    const testProduct: Dessert = {
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
    component.removeItem(testProduct);
    expect(cartService.remove).toHaveBeenCalledWith(testProduct, 1);
  });

  it('should toggle modal on placeOrder', () => {
    expect(component.showModal).toBeFalse();
    component.placeOrder();
    expect(component.showModal).toBeTrue();
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });
});
