import { Injectable } from '@angular/core';
import { Headers, Http, HttpModule } from '@angular/http';

import { Product } from './models';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
    private productsUrl = 'http://localhost:56010/api/products';  // URL to web api

    constructor(private http: Http) { }

    getProducts(): Promise<Product[]> {
        return this.http.get(this.productsUrl)
            .toPromise()
            .then(response => response.json() as Product[])
            .catch(this.handleError);
    }

    getProduct(id: number): Promise<Product> {
        let url = `${this.productsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Product)
            .catch(this.handleError);
    }

    private headers = new Headers({ 'Content-Type': 'application/json' });

    create(product: Product): Promise<Product> {
        return this.http
            .post(this.productsUrl, JSON.stringify(product), { headers: this.headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    update(product: Product): Promise<Product> {
        let url = `${this.productsUrl}/${product.Id}`;
        return this.http
            .put(url, JSON.stringify(product), { headers: this.headers })
            .toPromise()
            .then(() => product)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        let url = `${this.productsUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

