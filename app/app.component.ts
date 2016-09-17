import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
		<h1>{{title}}</h1>
		<nav>
			<a routerLink="/profile" routerLinkActive="active">Profile</a>
			<a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
			<a routerLink="/products" routerLinkActive="active">Products</a>
			<a routerLink="/tags" routerLinkActive="active">Tags</a>
		</nav>
   		<router-outlet></router-outlet>
	`,
    styleUrls: ['template/app.component.css']
})
export class AppComponent {
    title = 'Dramazon';
}
