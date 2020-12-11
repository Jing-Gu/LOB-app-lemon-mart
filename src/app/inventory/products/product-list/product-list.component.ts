import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Product } from '../products.model'
import { ProductService } from '../products.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute){}

  products: Product[]
  prodSub: Subscription

  ngOnInit(){
    this.prodSub = this.productService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products
      }
    )
    this.products = this.productService.getProducts()
  }

  onNewProduct(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onSaveData(){
    this.productService.storeProducts()
  }

  onFetchData(){
    this.productService.fetchProducts().subscribe()
  }

  ngOnDestroy(){
    this.prodSub.unsubscribe()
  }

}
