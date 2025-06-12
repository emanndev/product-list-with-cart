import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmationComponent } from './order-confirmation.component';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../services/cart.service';
import { of } from 'rxjs';
import { Dessert } from '../../../model/dessert.interface';
import { CartItem } from '../../../model/cartItem.interface';

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartServiceService>;

  const mockDessert: Dessert = {
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

  const mockCartItems: CartItem[] = [{ product: mockDessert, quantity: 2 }];

  beforeEach(async () => {
    cartServiceSpy = jasmine.createSpyObj('CartServiceService', [
      'getOrderSummary',
      'clearCart',
    ]);
    cartServiceSpy.getOrderSummary.and.returnValue({
      items: mockCartItems,
      totalQuantity: of(2),
      totalPrice: of(11.0),
    });
    cartServiceSpy.cartItems$ = of(mockCartItems);
    cartServiceSpy.totalQuantity$ = of(2);
    cartServiceSpy.totalPrice$ = of(11.0);

    await TestBed.configureTestingModule({
      imports: [OrderConfirmationComponent, CommonModule],
      providers: [{ provide: CartServiceService, useValue: cartServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize orderSummary from cart service', () => {
    expect(cartServiceSpy.getOrderSummary).toHaveBeenCalled();
    expect(component.orderSummary.items).toEqual(mockCartItems);
    component.orderSummary.totalQuantity.subscribe((quantity) => {
      expect(quantity).toBe(2);
    });
    component.orderSummary.totalPrice.subscribe((price) => {
      expect(price).toBe(11.0);
    });
  });

  it('should clear cart and emit close event on startNewOrder', () => {
    const closeSpy = spyOn(component.close, 'emit');
    component.startNewOrder();
    expect(cartServiceSpy.clearCart).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });
});
