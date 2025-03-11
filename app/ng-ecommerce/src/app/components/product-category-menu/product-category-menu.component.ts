import { Component, OnChanges, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit {

  isLoading: boolean = true;

  productCategories : ProductCategory[] = [];

  constructor(private productService : ProductService){}

  ngOnInit(){
    console.log("Poduct Categories 1 = " + JSON.stringify(this.productCategories));
      this.listProuctCategories();
      console.log("Poduct Categories 2 = " + JSON.stringify(this.productCategories));
  }

  listProuctCategories(){
    this.productService.getProductCategories().subscribe({
      next: (data) => {
        console.log("Poduct Categories = " + JSON.stringify(data));
        this.productCategories = data;
        this.isLoading = false; 
      },
      error: (error) => {
        console.error("Error fetching product categories", error);
        this.isLoading = false; // Stop loading in case of error
      },
      complete: () => {
        // Optional: Add completion logic here if needed
      }
  });
  }

}