import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Employee } from '../employees';
import { EmployeeService } from '../employee-service';
@Component({
	selector: 'app-delete-user-modal',
	templateUrl: './delete-user-modal.component.html',
	styleUrls: [ './delete-user-modal.component.css' ]
})
export class DeleteUserModalComponent implements OnInit {
	public form: FormGroup;
	public employee: Employee;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<DeleteUserModalComponent>,
		private employeeService: EmployeeService
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
		this.employeeService.delete(this.data.id).subscribe((result) => {
			this.dialogRef.close();
		});
	}
}
