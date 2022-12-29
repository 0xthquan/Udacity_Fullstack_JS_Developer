import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  constructor(private cartService: CartService) {}

  fullName: string | null = '';
  totalPrice: number | null = 0 ;

  ngOnInit(): void {
    this.fullName = this.cartService.getOrderInfo().fullName!
    this.totalPrice = this.cartService.getOrderInfo().totalPrice!
  }
}
