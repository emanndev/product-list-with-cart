import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { Dessert } from '../model/dessert.interface';
import { MainLogicService } from './services/main-logic.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductCardComponent, CartComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Product list';
  desserts: Dessert[] = [];

  constructor(private mainLogicService: MainLogicService) {}

  ngOnInit(): void {
    this.mainLogicService.getDesserts().subscribe({
      next: (data) => (this.desserts = data),
      error: (err) => console.error('Failed to load desserts', err),
    });
  }
}
