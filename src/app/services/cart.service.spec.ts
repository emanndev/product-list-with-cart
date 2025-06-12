import { TestBed } from '@angular/core/testing';

import { CartServiceService } from './cart.service';
import { Dessert } from '../../model/dessert.interface';
import { CartItem } from '../../model/cartItem.interface';
import { of } from 'rxjs';

describe('CartServiceService', () => {
  let service: CartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
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
    service.add(testProduct, 2);
    service.cartItems$.subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0].product).toEqual(testProduct);
      expect(items[0].quantity).toBe(2);
    });
  });

  it('should increase quantity of existing item', () => {
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
    service.add(testProduct, 1);
    service.add(testProduct, 2);
    service.cartItems$.subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(3);
    });
  });

  it('should remove item quantity', () => {
    const testProduct: Dessert = {
      id: 1,
      name: 'Test Dessert',
      category: 'Cake',
      price: 5.25,
      image: {
        thumbnail: 'thumbnail.jpg',
        mobile: 'mobile.jpg',
        tablet: 'tablet.jpg',
        desktop: 'desktop.jpg',
      },
    };
    service.add(testProduct, 2);
    service.remove(testProduct);
    service.cartItems$.subscribe((items) => {
      expect(items[0].quantity).toBe(1);
    });
  });

  it('should remove item when quantity is less than 0', () => {
    const testProduct: Dessert = {
      id: 1,
      name: 'Test Dessert',
      category: 'Cake',
      price: 5,
      image: {
        thumbnail: '.jpg',
        mobile: 'mobile.jpg',
        tablet: 'tablet.jpg',
        desktop: '.jpg',
      },
    };
    service.add(testProduct, 2);
    service.remove(testProduct, 3);
    service.cartItems$.subscribe((items) => {
      expect(items.length).toBe(0);
    });
  });
  it('should clear cart', () => {
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
    service.add(testProduct, 1);
    service.clearCart();
    service.cartItems$.subscribe((items) => {
      expect(items.length).toBe(0);
    });
  });
});
