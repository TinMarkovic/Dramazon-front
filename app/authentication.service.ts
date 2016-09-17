import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';

import { Customer, Rating, Product } from './models';
import { HttpClient } from './httpclient.service';

@Injectable()
export class AuthenticationService {
    url = 'http://localhost:56010/api/customers/';
    user: Customer;
    ratedProductIDs : number[] = [];
    constructor(private router: Router, private http: Http, private httpA: HttpClient) { }

    logout() {
        localStorage.removeItem("userLogin");
        this.user = null;
        this.httpA.loginData = null;
        this.router.navigate(['dashboard']);
    }

    login(customer: { Username: string, Password: string }) {
        if (this.user) return false;

        if (customer.Username && customer.Password) {
            this.httpA.loginData = this.buildHeader(customer.Username, customer.Password);
            this.httpA.get(this.url + customer.Username)
                .then(response => {
                    var servedCustomer = response.json() as Customer;
                    localStorage.setItem("userLogin", this.httpA.loginData);
                    this.user = servedCustomer;
                    if(servedCustomer.Cart) 
                        this.user.Cart = servedCustomer.Cart;
                    else
                        this.user.Cart = [];
                    this.router.navigate(['dashboard']);
                    return true;
                })
                .catch(this.handleError);
            return true;
        } else {
            return false;
        }
    }
    
    rateProduct(rating : number, productId : number) : void {
        var rateUrl = this.url + this.user.Username + "/product/" + productId + "/rate/" + rating;
        this.httpA.post(rateUrl, "").catch(this.handleError);
    }
    
    cartProduct(product : Product) : void {
        var url = this.url + this.user.Username + "/product/" + product.Id;
        console.log(url);
        this.httpA.post(url, "").then(()=>{
            this.user.Cart.push(product);
        }).catch(this.handleError);
    }
    
    decartProduct(product : Product) : void {
        var url = this.url + this.user.Username + "/product/" + product.Id;
        this.httpA.delete(url).then(()=>{
            for(var i :number; i < this.user.Cart.length; i++ ){
                if(this.user.Cart[i].Id == product.Id)
                    this.user.Cart.splice(i,1);
            }
        }).catch(this.handleError);
    }
    
    getRatings() : Promise<any> {
        var ratesUrl = this.url + this.user.Username + "/product/rates";
        return this.httpA.get(ratesUrl);
    }
    
    hasUserRatedProduct(productId : number) : Promise<any> {
        var ratedUrl = this.url + this.user.Username + "/product/" + productId +"/rate";
        return this.httpA.get(ratedUrl);
    }

    addCustomer(customer: Customer): Promise<Customer> {
        return this.http
            .post(this.url, JSON.stringify(customer),
            { headers: new Headers({ 'Content-Type': 'application/json' }) })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    updateCustomer(customer: Customer): Promise<Customer> {
        return this.http
            .put(this.url, JSON.stringify(customer),
            { headers: new Headers({ 'Content-Type': 'application/json' }) })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    
    checkout(): void{
        var url = this.url + this.user.Username + "/checkout";
        this.httpA.post(url, "").catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    buildHeader(username: string, password: string): string {
        return btoa(username + ":" + password);
    }
}