import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Contact } from '../contacts';
import { ContactService } from '../contact.service';
@Component({
	selector: 'app-delete-contact-modal',
	templateUrl: './delete-contact-modal.component.html',
	styleUrls: [ './delete-contact-modal.component.css' ]
})
export class DeleteContactModalComponent implements OnInit {
	public form: FormGroup;
	public contact: Contact;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<DeleteContactModalComponent>,
		private contactService: ContactService
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
		this.contactService.delete(this.data.id).subscribe((result) => {
			this.dialogRef.close();
		});
	}
}
