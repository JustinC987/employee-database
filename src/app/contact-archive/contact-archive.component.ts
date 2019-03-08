import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Contact } from '../contacts';
import { ContactService } from '../contact.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteContactModalComponent } from '../delete-contact-modal/delete-contact-modal.component';
import { merge, of } from 'rxjs';
import { tap, catchError, startWith, switchMap } from 'rxjs/operators';
import { ViewContactModalComponent } from '../view-contact-modal/view-contact-modal.component';
import { ContactReadStatus } from '../contact-read-status.enum';

@Component({
	selector: 'app-contact-archive',
	templateUrl: './contact-archive.component.html',
	styleUrls: [ './contact-archive.component.css' ]
})
export class ContactArchiveComponent implements OnInit {
	public initialSelection = [];
	public nResults = 0;
	public contacts: Contact[];
	public selection: SelectionModel<Contact>;
	public selectedRowIndex: number = -1;
	public displayedColumns: string[] = [
		'select',
		'id',
		'fname',
		'lname',
		'email',
		'phoneNumber',
		'message',
		'readStatus'
	];
	public dataSource = new MatTableDataSource(this.contacts);
	public markAsRead = false;
	constructor(
		public contactService: ContactService,
		public dialog: MatDialog
	) {}

	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngOnInit() {
		this.paginator.pageSize = 10;
		this.paginator.pageIndex = 0;
		this.dataSource.paginator = this.paginator;
		this.selection = new SelectionModel<Contact>(true);
		this.updateArchive();
	}

	getContacts() {
		this.contactService.getUser({}).subscribe((contacts) => {
			this.contacts = contacts;
		});
	}

	masterToggle() {
		this.selection.selected.length
			? this.selection.clear()
			: this.contacts.forEach((row) => this.selection.select(row));
	}

	resetPageIndex() {
		this.paginator.pageIndex = 0;
	}

	deleteSelection() {
		const nSelected = this.selection.selected.length;

		if (nSelected) {
			if (
				confirm(
					'Are you sure you would like to delete ' +
						nSelected +
						' contacts?'
				)
			) {
				const promises = [];

				this.selection.selected.forEach((contact) => {
					promises.push(
						this.contactService.delete(contact.id).toPromise()
					);
				});

				Promise.all(promises).then(() => this.updateArchive());
			}
		}
		else {
			alert('Please select contacts to delete.');
		}
	}

	deleteContact(contact: Contact) {
		this.dialog
			.open(DeleteContactModalComponent, {
				data: contact
			})
			.afterClosed()
			.subscribe(() => {
				this.updateArchive();
			});
	}

	updateArchive() {
		merge(
			this.paginator.page,
			this.contactService
				.getUser({
					__count: true
				})
				.pipe(
					tap((results) => {
						if (results.length && 'count' in results[0]) {
							this.nResults = +results[0]['count'];
						}

						return results;
					}),
					catchError((error) => {
						return of(0);
					})
				)
		)
			.pipe(
				startWith({}),
				switchMap(() => {
					return this.contactService.getUser({});
				}),
				tap((contact) => {
					this.selection.clear();

					return contact;
				}),
				catchError((error, caught) => {
					return of([]);
				})
			)
			.subscribe((contact) => (this.contacts = contact));
	}

	openContact(contact: Contact) {
		this.dialog
			.open(ViewContactModalComponent, {
				data: contact
			})
			.afterClosed()
			.subscribe(() => {
				this.contactService
					.update(contact.id, {
						fname: contact.fname,
						lname: contact.lname,
						email: contact.email,
						phoneNumber: contact.phoneNumber,
						message: contact.message,
						readStatus: ContactReadStatus.Read
					})
					.subscribe();
				this.updateArchive();
			});
	}

	openContactSelection() {
		if (this.selection.selected.length > 1) {
			alert('Please select only one contact to view at a time.');
			return;
		}
		else if (this.selection.selected.length) {
			this.selection.selected.forEach((contact) => {
				this.dialog.open(ViewContactModalComponent, {
					data: contact
				});
			});

			this.dialog.afterAllClosed.subscribe(() => {
				this.updateArchive();
			});
		}
		else {
			alert('Please select a contact to view.');
		}
	}
}
