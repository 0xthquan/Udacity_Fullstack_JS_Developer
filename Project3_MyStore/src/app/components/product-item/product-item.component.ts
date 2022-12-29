import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() productItem!: Product;
  selectedItem = '1';
  numberOfProduct: string[] = ['1', '2', '3', '4', '5'];

  constructor(private cartService: CartService) {}

  selectedChange(value: any) {
    this.selectedItem = value;
  }

  addProductToCart(product: Product): void {
    const cartProducts: Product[] = this.cartService.getCartProduct();
    let productInCart = cartProducts.find((item) => item.id === product.id);
    if (productInCart) {
      productInCart.amount = this.selectedItem;
      this.cartService.addProductToCart(cartProducts);
    } else {
      product.amount = this.selectedItem
      cartProducts.push(product);
      this.cartService.addProductToCart(cartProducts);
    }
    alert(`Added to your cart.`);
  }
}
