import { Component, OnInit } from '@angular/core';

import { ProductService } from './product.service';
import { TagService } from './tag.service';
import { Product, Tag } from './models';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'product-add',
    templateUrl: 'template/product-add.component.html',
    styleUrls: ['template/product-add.component.css']
})
export class ProductAddComponent implements OnInit {
    product: Product = <Product>{};
    tags: Tag[];

    constructor(
        private productService: ProductService,
        private tagService: TagService,
        private auth: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.tagService.getTags().then(tags => this.tags = tags);
        this.product.Tags = [];
    }

    onChange(tag: Tag): void {
        console.log("Click!");
        if (!this.product.Tags) this.product.Tags.push(tag);
        var index = this.product.Tags.indexOf(tag);
        if (index > 0) this.product.Tags.splice(index, 1);
        else this.product.Tags.push(tag); 
   }

    save(): void {
        this.product.Creator = this.auth.user;
        console.log("Saving... ", this.product);
        this.productService.create(this.product)
            .then(this.goBack);
    }

    goBack(): void {
        window.history.back();
    }
}
