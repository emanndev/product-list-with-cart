import { Component, Input } from '@angular/core';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { Dessert } from '../../../model/dessert.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [AddToCartComponent, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Dessert;
}
