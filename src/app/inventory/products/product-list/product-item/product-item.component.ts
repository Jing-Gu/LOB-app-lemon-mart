import { Component, Input, OnInit } from '@angular/core'
import { Product } from '../../products.model'
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.sass']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product
  @Input() index: number

  ngOnInit(){
  }

 /*  onSelected(){ 
    this.productService.productSelected.next(this.product)    
  } */

}
