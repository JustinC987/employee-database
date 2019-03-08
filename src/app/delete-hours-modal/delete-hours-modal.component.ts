import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { EmployeeHours } from '../employee-hours';
import { EmployeeHoursService } from '../employee-hours.service';
@Component({
	selector: 'app-delete-hours-modal',
	templateUrl: './delete-hours-modal.component.html',
	styleUrls: [ './delete-hours-modal.component.css' ]
})
export class DeleteHoursModalComponent implements OnInit {
	public form: FormGroup;
	public hours: EmployeeHours;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<DeleteHoursModalComponent>,
		private employeeHoursService: EmployeeHoursService
	) {}
	ngOnInit() {
		this.createForm();
	}

	createForm() {
		this.form = this.formBuilder.group({
			delete: [ '', [ Validators.required ] ]
		});
	}

	onSubmit() {
		this.employeeHoursService.delete(this.data.id).subscribe((result) => {
			this.dialogRef.close();
		});
	}
}
