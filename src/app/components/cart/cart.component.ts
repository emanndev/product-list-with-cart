import { Component, OnInit, Input, PipeTransform, Pipe } from '@angular/core';
import { Dessert } from '../../../model/dessert.interface';
import { MainLogicService } from '../../services/main-logic.service';
import { map, Observable } from 'rxjs';
import { CartServiceService } from '../../services/cart.service';
import { CartItem } from '../../../model/cartItem.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;
  itemCount$!: Observable<number>;
  total$!: Observable<number>;

  // constructor(private mainLogicService: MainLogicService) {}

  constructor(private cartService: CartServiceService) {}

  ngOnInit(): void {
    // this.desserts = this.mainLogicService.getDesserts();
    this.cartItems$ = this.cartService.cartItems$;
    this.itemCount$ = this.cartItems$.pipe(
      map((items) => items.reduce((c, i) => c + i.quantity, 0))
    );
    this.total$ = this.cartItems$.pipe(
      map((items) =>
        items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      )
    );
  }

  removeItem(product: Dessert): void {
    this.cartService.remove(product, 1);
  }

  placeOrder(): void {
    console.log('Order placed!', this.cartService.cartItems$);
  }
}
