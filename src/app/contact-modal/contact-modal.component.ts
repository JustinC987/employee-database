import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { validatorFocus } from 'pointy-fe/form';

import { ContactService } from '../contact.service';
import { Contact } from '../contacts';
import { HandlerService } from '../handler.service';

@Component({
	selector: 'app-contact-modal',
	templateUrl: './contact-modal.component.html',
	styleUrls: [ './contact-modal.component.css' ]
})
export class ContactModalComponent implements OnInit {
	public form: FormGroup;
	public contacts: Contact;
	public hasSubmit = false;

	constructor(
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<ContactModalComponent>,
		public contactService: ContactService,
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
			phoneNumber: [ '', [ Validators.required ] ],
			message: [ '', [ Validators.required ] ],
			readStatus: [ 'unread', [] ]
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

		this.contacts = this.form.getRawValue();

		this.contactService.post(this.contacts).subscribe((result) => {
			this.dialogRef.close();
		});
	}
}
