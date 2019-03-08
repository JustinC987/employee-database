import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee-service';
import { Employee } from '../employees';

import { validatorFocus } from 'pointy-fe/form';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	public form: FormGroup;
	public employee: Employee;
	public hasSubmit = false;

	constructor(
		public dialog: MatDialog,
		private fb: FormBuilder,
		public employeeService: EmployeeService
	) {}

	ngOnInit() {
		this.createSearchForm();
	}

	createSearchForm() {
		this.form = this.fb.group({
			fname: [ '', [ Validators.required ] ],
			lname: [ '', [ Validators.required ] ],
			email: [ '', [ Validators.required ] ],
			phoneNumber: [ '', [ Validators.required ] ]
		});
	}

	validateField(fieldName: string) {
		const field = this.form.get(fieldName);

		return (
			this.hasSubmit &&
			field &&
			field.invalid &&
			(field.dirty || field.touched)
		);
	}

	check(fieldName: string, validator: string) {
		return this.form.get(fieldName)['errors'][validator];
	}

	onSubmit() {
		this.hasSubmit = true;

		if (this.form.invalid) {
			validatorFocus('input.ng-invalid');
			console.log('INVALID!');

			return;
		}

		this.employee = this.form.getRawValue();

		this.employeeService.post(this.employee).subscribe((result) => {
			this.form.reset();

			this.dialog.open(SuccessModalComponent);
		});
	}

	openContact() {
		this.dialog.open(ContactModalComponent);
	}
}
