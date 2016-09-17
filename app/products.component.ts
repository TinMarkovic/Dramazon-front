import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from './models';
import { ProductService } from './product.service';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'all-products',
    templateUrl: 'template/products.component.html',
    styleUrls: ['template/products.component.css']
})
export class ProductsComponent implements OnInit {
    products: Product[];
    selectedProduct: Product;

    constructor(
        private productService: ProductService,
        private auth: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts(): void {
        this.productService.getProducts().then(products => this.products = products);
    }

    createProduct(): void {
        let link = ['products/new'];
        this.router.navigate(link);
    }

    onSelect(product: Product): void {
        this.selectedProduct = product;
    }

    gotoDetail(product: Product): void {
        let link = ['/detail', product.Id];
        this.router.navigate(link);
    }
}