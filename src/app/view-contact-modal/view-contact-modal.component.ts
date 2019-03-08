import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Contact } from '../contacts';
import { ContactService } from '../contact.service';
import { DeleteContactModalComponent } from '../delete-contact-modal/delete-contact-modal.component';

@Component({
	selector: 'app-view-contact-modal',
	templateUrl: './view-contact-modal.component.html',
	styleUrls: [ './view-contact-modal.component.css' ]
})
export class ViewContactModalComponent implements OnInit {
	public form: FormGroup;
	public hasSubmit = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<ViewContactModalComponent>,
		private contactService: ContactService,
		public dialog: MatDialog
	) {}

	ngOnInit() {
		this.createForm();
		this.form.controls['fname'].setValue(this.data.fname);
		this.form.controls['lname'].setValue(this.data.lname);
		this.form.controls['email'].setValue(this.data.email);
		this.form.controls['phoneNumber'].setValue(this.data.phoneNumber);
		this.form.controls['message'].setValue(this.data.message);
	}

	createForm() {
		this.form = this.formBuilder.group({
			fname: [ '', [ Validators.required ] ],
			lname: [ '', [ Validators.required ] ],
			email: [ '', [ Validators.required ] ],
			phoneNumber: [ '', [ Validators.required ] ],
			message: [ '', [ Validators.required ] ],
			readStatus: [ 'unread', [] ]
		});
	}

	sendEmail() {
		// TODO: prompt an email to data.email
	}

	deleteContact() {
		this.dialog
			.open(DeleteContactModalComponent, {
				data: this.data
			})
			.afterClosed()
			.subscribe(() => {
				this.dialogRef.close();
			});
	}
}
