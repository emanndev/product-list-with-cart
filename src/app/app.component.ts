import { Component } from '@angular/core';
import desseretData from '../../public/data.json';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { Dessert } from '../model/dessert.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductCardComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Product list';
  desserts: Dessert[] | null = null;

  constructor() {
    this.desserts = desseretData;
  }
}
