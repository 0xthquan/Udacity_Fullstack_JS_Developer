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
  amountOfItem = '1';
  constructor(private cartService: CartService) {}

  addProductToCart(product: Product): void {
    const cartProducts: Product[] = this.cartService.getCartProduct();
    let productInCart = cartProducts.find((item) => item.id === product.id);
    if (productInCart) {
      productInCart.amount = this.amountOfItem;
      this.cartService.addProductToCart(cartProducts);
    } else {
      product.amount = this.amountOfItem
      cartProducts.push(product);
      this.cartService.addProductToCart(cartProducts);
    }
    alert(`Added to your cart.`);
  }
}
