import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderInfo } from 'src/app/models/orderInfo.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];
  @Output() userInfo = new EventEmitter();

  totalPrice: number = 0;
  constructor(private productService: ProductService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartProduct();
    this.calculateTotal();
  }

  onSubmit(orderInfo: OrderInfo) {
    this.cartService.clearStorage();
    orderInfo.totalPrice = this.totalPrice
    this.cartService.setOrderInfo(orderInfo)
    this.router.navigateByUrl('/successOrder');
  }

  refresh(): void {
    window.location.reload();
  }

  changeQuantity(value: string, product: Product) {
    const index = this.cartProducts.indexOf(product);
    this.cartProducts[index] = product;
    this.cartProducts[index].amount = value;
    localStorage.setItem('products', JSON.stringify(this.cartProducts));
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.cartProducts.reduce((sum, item) => {
      this.totalPrice = parseFloat(
        (sum + item.price * Number(item.amount)).toFixed(2)
      );
      return this.totalPrice;
    }, 0);
  }

  removeProduct(id: number) {
    const storageProducts = this.cartService.getCartProduct();
    const products = storageProducts.filter(
      (product: Product) => product.id !== id
    );
    window.localStorage.clear();
    localStorage.setItem('products', JSON.stringify(products));
    this.refresh();
    this.calculateTotal();
  }
}
