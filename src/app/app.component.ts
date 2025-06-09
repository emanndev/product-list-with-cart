import { Component } from '@angular/core';
import desseretData from '../../public/data.json';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { Dessert } from '../model/dessert.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddToCartComponent],
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
