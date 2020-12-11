import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, BehaviorSubject, Subject } from 'rxjs'
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { Ingredient } from 'src/app/shared/ingredient.model'
import { StockEntryService } from '../stock-entry/stock-entry.service'
import { Product } from './products.model'
import { AuthService } from 'src/app/auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productSelected = new BehaviorSubject<Product>(null)
  productsChanged = new Subject<Product[]>()

  constructor(private stockEntryService: StockEntryService,
              private authService: AuthService,
              private http: HttpClient){}

  // default products are not needed, already stored in firebase
  /* private products: Product[] = [
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
  ] */

  private products: Product[] = []

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

  storeProducts(){
    return this.http.put('https://course-use-default-rtdb.firebaseio.com/products.json', this.products).subscribe(res => {
      console.log(res)
    })
  }

  fetchProducts(){
    return this.http.get<Product[]>('https://course-use-default-rtdb.firebaseio.com/products.json')
      .pipe(
        map(resProducts => {
          return resProducts.map(resProduct => {
            // transfrom res data, in case the ingredients are not there, give empty array
            return {...resProduct, ingredients: resProduct.ingredients ? resProduct.ingredients : []}
            })
          }),
        tap(resProducts => {
          this.products = resProducts
          this.productsChanged.next(this.products.slice())
        })
      )
  }
}
