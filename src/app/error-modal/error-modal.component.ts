import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-error-modal',
	templateUrl: './error-modal.component.html',
	styleUrls: [ './error-modal.component.css' ]
})
export class ErrorModalComponent implements OnInit {
	public message = 'Sorry, an error has occured. Please try again or contact the administrator';
	constructor(
		public dialogRef: MatDialogRef<ErrorModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit() {
		if (this.data && this.data.type === 'timeout') {
			this.message = 'Could not connect. Please try again.';
		}
	}
}
