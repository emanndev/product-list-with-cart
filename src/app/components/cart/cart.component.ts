import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartServiceService } from '../../services/cart.service';
import { CartItem } from '../../../model/cartItem.interface';
import { CommonModule } from '@angular/common';
import { Dessert } from '../../../model/dessert.interface';

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
  showModal = false;

  constructor(private cartService: CartServiceService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems$;
    this.itemCount$ = this.cartService.totalQuantity$;
    this.total$ = this.cartService.totalPrice$;
  }

  removeItem(product: Dessert): void {
    this.cartService.remove(product, 1);
  }

  placeOrder(): void {
    this.showModal = true;
    console.log('Order placed!', this.cartService.cartItems$);
  }

  closeModal(): void {
    this.showModal = false;
  }
}
