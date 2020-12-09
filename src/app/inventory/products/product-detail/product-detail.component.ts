import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Product } from '../products.model'
import { ProductService } from '../products.service'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})
export class ProductDetailComponent implements OnInit {
  id: number
  product: Product

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(){
    this.route.params.subscribe( (params: Params) => {
      this.id = +params['id']
      this.product = this.productService.getProduct(this.id)
    })
  }

  onEditProduct(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteProduct(){
    this.productService.deleteProduct(this.id)
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onAddToStock(){
    this.productService.addIngreToStock(this.product.ingredients)
  }
}
