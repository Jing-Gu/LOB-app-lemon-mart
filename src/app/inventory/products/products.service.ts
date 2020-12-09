import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, Subject } from 'rxjs'
import { Ingredient } from 'src/app/shared/ingredient.model'
import { StockEntryService } from '../stock-entry/stock-entry.service'
import { Product } from './products.model'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productSelected = new BehaviorSubject<Product>(null)
  productsChanged = new Subject<Product[]>()

  constructor(private stockEntryService: StockEntryService){}

  private products: Product[] = [
    new Product(
      'Lemon chicken',
      'oh good chicken',
      'https://pinchofyum.com/wp-content/uploads/5-Ingredient-Lemon-Chicken-Recipe.jpg',
      [
        new Ingredient('chicken', 1),
        new Ingredient('lemon', 2)
      ]
    ),
    new Product(
      'Lemon cake',
      'yummyyy cake',
      'https://img.delicious.com.au/urA5IEeK/w1200/del/2016/06/pistachio-and-lemon-layer-cake-31269-1.jpg',
      [
        new Ingredient('flour', 3),
        new Ingredient('sugar', 4)
      ]
    )
  ]

  getProObs(): Observable<Product>{
    return this.productSelected.asObservable()
  }

  getProducts(){
    return this.products.slice()
  }

  getProduct(index: number){
    return this.products[index]
  }

  addProduct(product: Product){
    this.products.push(product)
    this.productsChanged.next(this.products.slice())
  }

  updateProduct(index: number, newProduct: Product){
    this.products[index] = newProduct
    this.productsChanged.next(this.products.slice())
  }

  deleteProduct(index: number){
    this.products.splice(index, 1)
    this.productsChanged.next(this.products.slice())
  }


  addIngreToStock(ingredients: Ingredient[]){
    this.stockEntryService.addToStock(ingredients)
  }

}
