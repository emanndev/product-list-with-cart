import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dessert } from '../../model/dessert.interface';
import { CartItem } from '../../model/cartItem.interface';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  totalQuantity$ = this.cartItems$.pipe(
    map((items) => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  totalPrice$ = this.cartItems$.pipe(
    map((items) =>
      items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    )
  );

  add(product: Dessert, quantity: number = 1): void {
    const items = [...this.cartItemsSubject.getValue()];
    const idx = items.findIndex((i) => i.product.id === product.id);
    if (idx > -1) {
      items[idx].quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    this.cartItemsSubject.next(items);
  }

  remove(product: Dessert, quantity: number = 1): void {
    const items = [...this.cartItemsSubject.getValue()];
    const idx = items.findIndex((i) => i.product.id === product.id);
    if (idx > -1) {
      items[idx].quantity -= quantity;
      if (items[idx].quantity < 1) {
        items[idx].quantity = 0;
      }
    }
    this.cartItemsSubject.next(items);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getOrderSummary() {
    return {
      items: this.cartItemsSubject.getValue(),
      totalQuantity: this.totalQuantity$,
      totalPrice: this.totalPrice$,
    };
  }
}
