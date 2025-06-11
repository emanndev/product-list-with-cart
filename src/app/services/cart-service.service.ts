import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dessert } from '../../model/dessert.interface';
import { CartItem } from '../../model/cartItem.interface';
@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  add(product: Dessert, quantity: number = 1) {
    const items = [...this.cartItemsSubject.getValue()];
    const idx = items.findIndex((i) => i.product.name === product.name);
    if (idx > -1) {
      items[idx].quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    this.cartItemsSubject.next(items);
  }
  remove(product: Dessert, quantity: number = 1) {
    const items = [...this.cartItemsSubject.getValue()];
    const idx = items.findIndex((i) => i.product.name === product.name);
    if (idx > -1) {
      items[idx].quantity -= quantity;
      if (items[idx].quantity <= 0) {
        items.splice(idx, 1);
      }
      this.cartItemsSubject.next(items);
    }
  }

  getTotal(): number {
    return this.cartItemsSubject
      .getValue()
      .reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }
  constructor() {}
}
