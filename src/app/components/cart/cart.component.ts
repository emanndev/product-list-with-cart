import { Component, OnInit } from '@angular/core';
import { Dessert } from '../../../model/dessert.interface';
import { MainLogicService } from '../../services/main-logic.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  desserts: Dessert[] | null = null;
  cartData: Dessert[] | null = null;
  constructor(private mainLogicService: MainLogicService) {}
  ngOnInit(): void {
    this.desserts = this.mainLogicService.getDesserts();
  }
}
