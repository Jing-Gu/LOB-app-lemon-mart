import { AfterViewInit, Component, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './products.service'
import { Product } from './products.model'
import { Subject, Subscription } from 'rxjs'
import * as Rx from "rxjs"

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  selected: Product

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProObs().subscribe(
      (data) => {
        //console.log(data)
        this.selected = data
      })
  }

    
        



}
