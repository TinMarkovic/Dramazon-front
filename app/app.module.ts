import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard.component';
import { HttpClient } from './httpclient.service';

import { ProductService } from './product.service';
import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductAddComponent } from './product-add.component';

import { TagService } from './tag.service';
import { TagsComponent } from './tags.component';

import { AuthenticationService } from './authentication.service';
import { ProfileComponent } from './profile.component';
import { RegisterComponent } from './register.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        ProductDetailComponent,
        ProductsComponent,
        ProductAddComponent,
        TagsComponent,
        ProfileComponent,
        RegisterComponent
    ],
    providers: [
        ProductService,
        TagService,
        AuthenticationService,
        HttpClient
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
