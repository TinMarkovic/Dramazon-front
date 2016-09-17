import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ProductService } from './product.service';
import { Product } from './models';

@Component({
    selector: 'my-product-detail',
    templateUrl: 'template/product-detail.component.html',
    styleUrls: ['template/product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    product: Product;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.productService.getProduct(id)
                .then(product => this.product = product);
        });
    }

    save(): void {
        this.productService.update(this.product)
            .then(this.goBack);
    }

    delete(): void {
        this.productService.delete(this.product.Id)
            .then(this.goBack);
    }

    goBack(): void {
        window.history.back();
    }
}
