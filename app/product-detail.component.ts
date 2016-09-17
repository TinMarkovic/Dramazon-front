import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ProductService } from './product.service';
import { TagService } from './tag.service';
import { Product, Tag, Rating } from './models';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'my-product-detail',
    templateUrl: 'template/product-detail.component.html',
    styleUrls: ['template/product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    product: Product;
    editor: boolean = false;
    rated: number = 0;
    inCart: boolean = false;
    tags: Tag[];

    constructor(
        private productService: ProductService,
        private auth: AuthenticationService,
        private tagService: TagService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.tagService.getTags().then(tags => this.tags = tags);
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.productService.getProduct(id)
                .then(product => {
                    this.product = product;
                    if (this.auth.user) {
                        this.auth.hasUserRatedProduct(this.product.Id)
                            .then(testRaw => {
                                console.log(testRaw);
                                if (testRaw._body) var test = testRaw.json();
                                else var test = null;
                                if (test) {
                                    this.rated = test.Value;
                                } else {
                                    this.rated = 0;
                                }
                            }).catch(this.handleError);
                        if (this.product.Creator.Id == this.auth.user.Id)
                            this.editor = true;
                        this.inCart = false;
                        console.log(this.auth.user.Cart);
                        for (var i: number; i < this.auth.user.Cart.length; i++) {
                            if (this.auth.user.Cart[i].Id == product.Id)
                                this.inCart = true;
                        }
                    }}).catch(this.handleError);
        });
    }

    checked(tag: Tag): boolean {
        for (var i = 0; i < this.product.Tags.length; i++)
            if (this.product.Tags[i].Id == tag.Id) return true;
        return false;
    }

    onChange(tag: Tag): void {
        if (!this.product.Tags) {
            this.product.Tags.push(tag);
            return;
        }
        for (var i = 0; i < this.product.Tags.length; i++) {
            if (this.product.Tags[i].Id == tag.Id) {
                this.product.Tags.splice(i, 1);
                return;
            }
        }
        this.product.Tags.push(tag);
    }
    
    rate(rating: number): void {
        this.auth.rateProduct(rating, this.product.Id);
        this.rated = rating;
    }
    
    save(): void {
        this.productService.update(this.product)
            .then(this.goBack);
    }

    delete(): void {
        this.productService.delete(this.product.Id)
            .then(this.goBack);
    }

    cart(): void {
        this.auth.cartProduct(this.product);
        this.inCart = true;
    }

    decart(): void {
        this.auth.decartProduct(this.product);
        this.inCart = false;
    }

    goBack(): void {
        window.history.back();
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
