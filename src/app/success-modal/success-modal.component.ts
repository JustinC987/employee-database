import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
	selector: 'app-success-modal',
	templateUrl: './success-modal.component.html',
	styleUrls: [ './success-modal.component.css' ]
})
export class SuccessModalComponent implements OnInit {
	constructor(public dialogRef: MatDialogRef<SuccessModalComponent>) {}

	ngOnInit() {}
}
