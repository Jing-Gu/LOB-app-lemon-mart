import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Params, ActivatedRoute, Router } from '@angular/router'
import { ProductService } from '../products.service'

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.sass']
})
export class ProductEditComponent implements OnInit {

  id: number
  editMode = false
  productEditForm: FormGroup

  get ingreControls(){
    return (this.productEditForm.get('ingredients') as FormArray).controls
  }

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        if(params['id']){
          this.editMode = true
        }else{
          this.editMode = false
        }
      }
    )
    this.initForm()
  }

  private initForm(){
    let productName = ''
    let productImagePath = ''
    let productDesc = ''
    let productIngredients = new FormArray([])

    if(this.editMode){
      const currentProduct = this.productService.getProduct(this.id)
      productName = currentProduct.name
      productImagePath = currentProduct.imagePath
      productDesc = currentProduct.description
      if(currentProduct['ingredients']){
        for(let ingredient of currentProduct.ingredients){
          productIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, [Validators.required]),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }

    this.productEditForm = new FormGroup({
      name: new FormControl(productName, [Validators.required]),
      imagePath: new FormControl(productImagePath, [Validators.required]),
      description: new FormControl(productDesc, [Validators.required]),
      ingredients: productIngredients
    })
  }

  onAddIngredient(){
    (<FormArray>this.productEditForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.productEditForm.get('ingredients')).removeAt(index)
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onSubmit(){
    console.log(this.productEditForm)
    if(this.editMode){
      this.productService.updateProduct(this.id, this.productEditForm.value)
    }else{
      this.productService.addProduct(this.productEditForm.value)
    }
    this.onCancel()
  }

}
