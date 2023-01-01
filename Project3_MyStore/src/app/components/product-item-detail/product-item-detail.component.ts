import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  product!: Product;
  products!: Product[];
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });

    this.productService.loadProducts().subscribe((data) => {
      this.products = data;
      this.product = this.getProductDetailBy(this.id);
      this.product.amount = "1"
    });
  }

  getProductDetailBy(id: any) {
    return this.products.filter((item) => item.id === id)[0];
  }

  addProductToCart(product: Product): void {
    const cartProducts: Product[] = this.cartService.getCartProduct();
    let productInCart = cartProducts.find((item) => item.id === product.id);
    if (productInCart) {
      productInCart.amount = this.product.amount;
      this.cartService.addProductToCart(cartProducts);
    } else {
      cartProducts.push(product);
      this.cartService.addProductToCart(cartProducts);
    }
    alert(`Added to your cart.`);
  }
}
