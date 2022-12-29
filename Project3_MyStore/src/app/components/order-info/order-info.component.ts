import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderInfo } from 'src/app/models/orderInfo.model';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css'],
})
export class OrderInfoComponent implements OnInit {
  @Output() orderInfoEvent: EventEmitter<OrderInfo> = new EventEmitter();
  constructor() {}
  orderInfo!: OrderInfo;
  fullName: string = '';
  address: string = '';
  creditCard: string = '';

  ngOnInit(): void {}
  onSubmit() {
    this.orderInfo = {
      fullName: this.fullName,
      address: this.address
    }

    this.orderInfoEvent.emit(this.orderInfo);
  }
}
