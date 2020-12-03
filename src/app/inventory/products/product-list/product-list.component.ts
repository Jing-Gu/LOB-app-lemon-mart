import { Component, EventEmitter, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs'
import { Product } from '../products.model'
import { ProductService } from '../products.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {
  //@Output() productWasSelected = new EventEmitter<Product>()
  constructor(private productService: ProductService){}

  products: Product[] 

  ngOnInit() {
    this.products = this.productService.getProducts()
  }

  /* onProductSelected(product: Product){
    this.productWasSelected.emit(product)
  } */

}
