import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { EmployeeHoursModalComponent } from '../employee-hours-modal/employee-hours-modal.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	public isLoggedIn = true;

	constructor(private dialog: MatDialog) {}

	ngOnInit() {}

	logout() {
		this.isLoggedIn = false;
	}

	openContact() {
		this.dialog.open(ContactModalComponent);
	}

	openEmployeeHours() {
		this.dialog.open(EmployeeHoursModalComponent);
	}
}
