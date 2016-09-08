import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { DashboardComponent } from './dashboard.component';
import { ProductDetailComponent } from './product-detail.component';

const appRoutes: Routes = [
	{
		path: 'products',
		component: ProductsComponent
	},
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
		path: 'detail/:id',
		component: ProductDetailComponent
	},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);