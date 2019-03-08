import { Component, OnInit } from '@angular/core';
import { HandlerService } from './handler.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	title = 'employee-registration';

	constructor(public handler: HandlerService) {}

	ngOnInit() {
		this.handler.hideBackgroundLoader();
	}
}
