import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1; // 1 by default
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thepageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";

  constructor(private cartService : CartService, private productService: ProductService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.route.paramMap.subscribe(
      () => {
        this.listProducts();
      }
    );
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {
    const thekeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a different keyword than previous
    // then set thePagenumber to 1
    if (this.previousKeyword != thekeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = thekeyword;
    console.log(`keyword=${thekeyword}, thepageNumber=${this.thePageNumber}`);

    // now search for the products using keyword
    this.productService.searchProductListPaginate(this.thePageNumber - 1, this.thepageSize, thekeyword).subscribe(
      this.processResult()
    );
  }

  processResult(){
    return (data : any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thepageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  handleListProducts() {
    // check id 'id' parameter is available
    const hascategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hascategoryId) {
      // get the 'id' param string, convert to a number using the '+' symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!; // '!' non null, '+' convert string to number
    }
    else {
      // not category id available ... default to category id = 1
      this.currentCategoryId = 1;
    }

    //
    // Check if we have a different category then previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePagenumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thepageSize, this.currentCategoryId).subscribe(
      this.processResult()
    );
  }

  updatePageSize(pageSize: string) {
    this.thepageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct : Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

}