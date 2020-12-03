import { Component, Input, OnInit } from '@angular/core'
import { Product } from '../../products.model'
import { ProductService } from '../../products.service'

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.sass']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product

  constructor(private productService: ProductService) { }

  ngOnInit(){
  }

  onSelected(){ 
    this.productService.productSelected.next(this.product)    
  }

}
