import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product, Customer } from './models';
import { ProductService } from './product.service';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'template/dashboard.component.html',
    styleUrls: ['template/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    products: Product[];
    customer: Customer;

    constructor(
        private productService: ProductService,
        private auth: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.auth.user) {
            this.customer = this.auth.user;
            this.products = this.auth.user.Cart;
        } else {
            this.productService.getProducts().then(products => this.products = products);
        }
    }
    
    checkout(): void{
        this.auth.checkout();
    }
    
    gotoDetail(product: Product): void {
        let link = ['/detail', product.Id];
        this.router.navigate(link);
    }

}
