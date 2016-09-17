import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductAddComponent } from './product-add.component';
import { ProductDetailComponent } from './product-detail.component';
import { DashboardComponent } from './dashboard.component';
import { TagsComponent } from './tags.component';
import { ProfileComponent } from './profile.component';
import { RegisterComponent } from './register.component';

const appRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'products/new',
        component: ProductAddComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'detail/:id',
        component: ProductDetailComponent
    },
    {
        path: 'tags',
        component: TagsComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);