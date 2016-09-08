import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductsComponent } from './products.component';
import { DashboardComponent } from './dashboard.component';
import { ProductService } from './product.service';
import { routing } from './app.routing';

@NgModule({
	imports: [ 
		BrowserModule, 
		FormsModule,
		routing,
	],
	declarations: [ 
		AppComponent, 
		ProductDetailComponent,
		ProductsComponent,
		DashboardComponent
	],
	providers: [
		ProductService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
