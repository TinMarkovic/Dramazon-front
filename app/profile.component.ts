import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Customer } from './models';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'profile',
    templateUrl: 'template/profile.component.html'
})
export class ProfileComponent implements OnInit {
    logged: boolean = false;
    customer: Customer = <Customer>{};

    constructor(
        private auth: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.auth.user) {
            this.logged = true;
            this.customer = this.auth.user;
        }
    }

    toReg(): void {
        let link = ['/register'];
        this.router.navigate(link);
    }

    login(): void {
        this.auth.login(this.customer);
    }

    logout(): void {
        this.auth.logout();
    }

    goBack(): void {
        window.history.back();
    }
}