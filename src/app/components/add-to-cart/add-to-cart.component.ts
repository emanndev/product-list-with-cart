import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('cartSection') cartSection!: ElementRef;

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
    // this.toastr.success(`${this.product.name} added to cart!`, 'Success');
    this.scrollToCart();
  }

  increaseProductItem() {
    this.quantity++;
    this.cartService.add(this.product, 1);
    // this.toastr.success(`${this.product.name} added to cart!`, 'Success');
    this.scrollToCart();
  }

  decreaseProductItem() {
    if (this.quantity > 1) {
      this.quantity--;
      this.cartService.remove(this.product, 1);
      // this.toastr.info(
      //   `Decreased ${this.product.name} to ${this.quantity}x`,
      //   'Cart Updated'
      // );
    } else {
      this.cartService.remove(this.product, 1);
      this.inCart = false;
      // this.toastr.warning(`${this.product.name} removed from cart!`, 'Removed');
    }
    this.scrollToCart();
  }
  private scrollToCart() {
    if (window.innerWidth <= 900) {
      // Tablet/mobile view
      const cartElement = document.querySelector('.cart');
      if (cartElement) {
        cartElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
