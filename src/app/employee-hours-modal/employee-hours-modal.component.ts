import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { validatorFocus } from 'pointy-fe/form';

import { EmployeeHoursService } from '../employee-hours.service';
import { EmployeeHours } from '../employee-hours';
import { HandlerService } from '../handler.service';

@Component({
	selector: 'app-employee-hours-modal',
	templateUrl: './employee-hours-modal.component.html',
	styleUrls: [ './employee-hours-modal.component.css' ]
})
export class EmployeeHoursModalComponent implements OnInit {
	public form: FormGroup;
	public employeeHours: EmployeeHours;
	public hasSubmit = false;
	public employeeTotalHours = 0;

	constructor(
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<EmployeeHoursModalComponent>,
		public employeeHoursService: EmployeeHoursService,
		private handler: HandlerService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit() {
		this.createForm();
	}

	createForm() {
		this.form = this.formBuilder.group({
			startDate: [ '', Validators.required ],
			endDate: [ '', Validators.required ],
			test: [ '', [ Validators.required ] ],
			monday: [ 0 ],
			tuesday: [ 0 ],
			wednesday: [ 0 ],
			thursday: [ 0 ],
			friday: [ 0 ],
			saturday: [ 0 ],
			sunday: [ 0 ],
			totalHours: [ 0 ]
		});
	}

	setTotalHours() {
		const monday = this.form.controls['monday'].value;
		const tuesday = this.form.controls['tuesday'].value;
		const wednesday = this.form.controls['wednesday'].value;
		const thursday = this.form.controls['thursday'].value;
		const friday = this.form.controls['friday'].value;
		const saturday = this.form.controls['saturday'].value;
		const sunday = this.form.controls['sunday'].value;

		if (
			monday == 0 &&
			tuesday == 0 &&
			wednesday == 0 &&
			thursday == 0 &&
			friday == 0 &&
			saturday == 0 &&
			sunday == 0
		) {
			alert(
				'Please enter your hours. If you have no hours for the week you do not need to submit this form.'
			);
		}

		this.employeeTotalHours =
			monday +
			tuesday +
			wednesday +
			thursday +
			friday +
			saturday +
			sunday;
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
		if (this.employeeTotalHours == 0) {
			alert(
				'Please click the "calculate" button to determine your total hours'
			);

			return;
		}
		this.hasSubmit = true;

		if (this.form.invalid) {
			validatorFocus('input.ng-invalid');
			console.log('INVALID!');

			return;
		}

		this.employeeHours = this.form.getRawValue();

		this.employeeHoursService
			.post(this.employeeHours)
			.subscribe((result) => {
				this.dialogRef.close();
			});
	}
}
