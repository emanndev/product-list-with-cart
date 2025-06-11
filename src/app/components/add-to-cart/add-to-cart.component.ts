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
    this.delay;
  }

  delay() {
    setTimeout(() => {
      this.isAddedToCart = false;
    }, 1000);
  }
}

//  @Input() product!: Dessert;

//   quantity = 1;
//   inCart = false;
//   cartQuantity$: Observable<number> = new Observable();

//   constructor(private cartService: CartServiceService) {}

//   ngOnInit() {
//     this.cartQuantity$ = this.cartService.cartItems$.pipe(
//       map((items) => {
//         const item = items.find((i) => i.product.name === this.product.name);
//         return item?.quantity || 0;
//       })
//     );
//   }

//   addToCart() {
//     this.cartService.add(this.product, this.quantity);
//     this.inCart = true;
//   }

//   increaseProductItem() {
//     this.quantity++;
//     this.cartService.add(this.product, 1);
//   }

//   decreaseProductItem() {
//     if (this.quantity > 1) {
//       this.quantity--;
//       this.cartService.remove(this.product, 1);
//     } else {
//       this.cartService.remove(this.product, 1);
//       this.inCart = false;
//     }
//   }
// }
