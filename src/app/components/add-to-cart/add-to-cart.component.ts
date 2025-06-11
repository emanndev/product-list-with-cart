import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dessert } from '../../../model/dessert.interface';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss',
})
export class AddToCartComponent implements OnInit {
  @Input() product!: Dessert;
  quantity = 1;
  inCart = false;
  cartQuantity$: Observable<number> = new Observable();

  constructor(private cartService: CartServiceService) {}

  ngOnInit(): void {
    this.cartQuantity$ = this.cartService.cartItems$.pipe(
      map((items) => {
        const item = items.find((i) => i.product.id === this.product.id);
        return item?.quantity || 0;
      })
    );
    this.cartQuantity$.subscribe((quantity) => {
      this.inCart = quantity > 0;
      this.quantity = quantity || 1;
    });
  }

  addToCart() {
    this.cartService.add(this.product, this.quantity);
    this.inCart = true;
  }

  increaseProductItem() {
    this.quantity++;
    this.cartService.add(this.product, 1);
  }

  decreaseProductItem() {
    if (this.quantity > 1) {
      this.quantity--;
      this.cartService.remove(this.product, 1);
    } else {
      this.cartService.remove(this.product, 1);
      this.inCart = false;
    }
  }
}
