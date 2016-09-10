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
            return this.getProducts()
               .then(products => products.find(product => product.Id === id));
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

