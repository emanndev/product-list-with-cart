import { Component, OnInit } from '@angular/core';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { Dessert } from '../../../model/dessert.interface';
import { MainLogicService } from '../../services/main-logic.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [AddToCartComponent, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  desserts: Dessert[] | null = null;

  constructor(private mainLogicService: MainLogicService) {}

  ngOnInit(): void {
    this.desserts = this.mainLogicService.getDesserts();
  }
}
