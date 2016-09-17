import { Component, OnInit } from '@angular/core';

import { Customer } from './models';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'profile',
    templateUrl: 'template/register.component.html',
    styleUrls: ['template/product-add.component.css']
})
export class RegisterComponent implements OnInit {
    customer: Customer = <Customer>{};
    passwordTest: String;

    constructor(
        private auth: AuthenticationService
    ) { }



    ngOnInit(): void {
        if (this.auth.user) {
            this.customer = this.auth.user;
        }
    }

    register(): void {
        if (this.passwordTest != this.customer.Password) {
            alert("Your passwords have to match.");
            return;
        }
        this.auth.addCustomer(this.customer).then(() => {
            this.goBack();
        });
    }

    update(): void {
        if (this.passwordTest != this.customer.Password) {
            alert("Your passwords have to match.");
            return;
        }
        this.auth.updateCustomer(this.customer).then(() => {
            this.goBack();
        });
    }
    goBack(): void {
        window.history.back();
    }
}