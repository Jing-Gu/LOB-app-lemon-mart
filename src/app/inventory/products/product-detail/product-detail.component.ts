import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../products.model'
import { ProductService } from '../products.service'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onAddToStock(){
    this.productService.addIngreToStock(this.product.ingredients)
  }
}
