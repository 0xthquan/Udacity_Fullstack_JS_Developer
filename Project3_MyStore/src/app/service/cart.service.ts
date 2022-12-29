import { Injectable } from '@angular/core';
import { OrderInfo } from '../models/orderInfo.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  localStorage = window.localStorage;

  constructor() { }

  addProductToCart(product: Product[]) {
    this.localStorage.setItem('products', JSON.stringify(product));
  }

  getCartProduct(): Product[] | [] {
    const cartProducts = this.localStorage.getItem('products');
    return cartProducts ? JSON.parse(cartProducts) : [];
  }

  setOrderInfo(orderInfo: OrderInfo): void {
    this.localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
  }

  getOrderInfo(): OrderInfo {
    const orderInfo = this.localStorage.getItem('orderInfo');
    return orderInfo ? JSON.parse(orderInfo) : [];
  }

  clearStorage(): void {
    this.localStorage.clear();
  }
}
