import { Component } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss',
})
export class AddToCartComponent {
  isAddedToCart = false;
  quantity = 1;

  addToCart() {
    this.isAddedToCart = true;
  }

  decreaseProductItem() {
    if (this.quantity > 1) {
      this.quantity--;
      this.delay();
    }
  }

  increaseProductItem() {
    ++this.quantity;
    this.delay();
  }

  delay() {
    setTimeout(() => {
      this.isAddedToCart = false;
    }, 1000);
  }
}
