import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'

import { Product } from './products.model'
import { ProductService } from './products.service'

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(private productService: ProductService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const products = this.productService.getProducts()

    if(products.length === 0){
      return this.productService.fetchProducts()
    }else{
      return products
    }

  }

}

// resolver loads the data before the page is loaded,
// otherwise Angular throws error not finding the name, since it is not fetched yet
