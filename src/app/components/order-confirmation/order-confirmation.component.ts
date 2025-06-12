import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../services/cart.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss',
})
export class OrderConfirmationComponent {
  @Output() close = new EventEmitter<void>();
  orderSummary: ReturnType<CartServiceService['getOrderSummary']>;

  constructor(private cartService: CartServiceService) {
    this.orderSummary = this.cartService.getOrderSummary();
  }

  startNewOrder(): void {
    this.cartService.clearCart();
    this.close.emit();
  }
}
