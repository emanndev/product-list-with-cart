import { Component, OnInit, Input, Signal, signal } from '@angular/core';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { Dessert } from '../../../model/dessert.interface';
import { MainLogicService } from '../../services/main-logic.service';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [AddToCartComponent, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  desserts = signal<Dessert[]>([]);
  @Input() product!: Dessert;

  constructor(
    private mainLogicService: MainLogicService,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    this.mainLogicService
      .getDesserts()
      .subscribe((data) => this.desserts.set(data));
  }

  addToCart(): void {
    this.cartService.add(this.product);
  }

  removeFromCart() {
    this.cartService.remove(this.product, 1);
  }
}
