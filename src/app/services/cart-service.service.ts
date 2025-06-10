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

  add(product: Dessert): void {
    const items = [...this.cartItemsSubject.getValue()];
    const index = items.findIndex((item) => item.product.name === product.name);
    if (index > -1) {
      items[index].quantity++;
    } else {
      items.push({ product, quantity: 1 });
    }
    this.cartItemsSubject.next(items);
  }

  remove(productId: number): void {
    let items = [...this.cartItemsSubject.getValue()];
    const index = items.findIndex((item) => item.product.id !== productId);
    if (index > -1) {
      items[index].quantity--;
      if (items[index].quantity <= 0) items.splice(index, 1);
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
