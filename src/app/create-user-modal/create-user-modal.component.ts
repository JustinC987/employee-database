import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { EmployeeService } from '../employee-service';
import { Employee } from '../employees';
import { HandlerService } from '../handler.service';

@Component({
	selector: 'app-create-user-modal',
	templateUrl: './create-user-modal.component.html',
	styleUrls: [ './create-user-modal.component.css' ]
})
export class CreateUserModalComponent implements OnInit {
	public form: FormGroup;
	public employee: Employee;

	constructor(
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<CreateUserModalComponent>,
		private employeeService: EmployeeService,
		private handler: HandlerService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit() {
		this.createForm();
	}

	createForm() {
		this.form = this.formBuilder.group({
			fname: [ '', [ Validators.required ] ],
			lname: [ '', [ Validators.required ] ],
			email: [ '', [ Validators.required ] ],
			phoneNumber: [ '', [ Validators.required ] ]
		});
	}

	onSubmit() {
		this.employee = this.form.getRawValue();

		this.employeeService.post(this.employee).subscribe();

		this.dialogRef.close();
	}
}
