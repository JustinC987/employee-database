import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Employee } from '../employees';
import { EmployeeService } from '../employee-service';

@Component({
	selector: 'app-edit-user-modal',
	templateUrl: './edit-user-modal.component.html',
	styleUrls: [ './edit-user-modal.component.css' ]
})
export class EditUserModalComponent implements OnInit {
	public form: FormGroup;
	public errorString?: string;
	public hasSubmit = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<EditUserModalComponent>,
		private employeeService: EmployeeService
	) {}

	ngOnInit() {
		this.createForm();
		this.form.controls['fname'].setValue(this.data.fname);
		this.form.controls['lname'].setValue(this.data.lname);
		this.form.controls['email'].setValue(this.data.email);
		this.form.controls['phoneNumber'].setValue(this.data.phoneNumber);
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
		this.hasSubmit = true;

		const id = this.data.id;
		this.data = this.form.getRawValue();
		this.employeeService.update(id, this.data).subscribe((result) => {
			this.dialogRef.close();
		});
	}
}
