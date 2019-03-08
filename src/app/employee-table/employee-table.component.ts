import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, merge, of } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import {
	MatTableDataSource,
	MatPaginator,
	MatSort,
	MatTable
} from '@angular/material';
import { MatDialog } from '@angular/material';
import { createSearchQuery } from 'pointy-fe/http';

import { EmployeeService } from '../employee-service';
import { Employee } from '../employees';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';
import { DeleteUserModalComponent } from '../delete-user-modal/delete-user-modal.component';
import { tap, startWith, switchMap, catchError } from 'rxjs/operators';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';

@Component({
	selector: 'app-employee-table',
	templateUrl: './employee-table.component.html',
	styleUrls: [ './employee-table.component.css' ]
})
export class EmployeeTableComponent implements OnInit {
	public employees?: Employee[] = [];
	public search = '';
	public errorString?: string;
	public nResults = 0;
	public dataSource: MatTableDataSource<Employee>;
	public initialSelection = [];
	public allowMultiSelect = true;
	public selection: SelectionModel<Employee>;
	public selectedRowIndex: number = -1;
	public markAsRead = false;


	public columns: string[] = [
		'select',
		'id',
		'fname',
		'lname',
		'email',
		'phoneNumber'
	];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private employeeService: EmployeeService,
		private dialog: MatDialog
	) {}

	ngOnInit() {
		this.paginator.pageSize = 10;
		this.paginator.pageIndex = 0;
		this.sort.direction = 'desc';
		this.sort.active = 'id';

		this.selection = new SelectionModel<Employee>(true);
		this.updateArchive();
	}

	updateArchive() {
		merge(
			this.sort.sortChange,
			this.paginator.page,
			this.employeeService
				.getUser({
					__search: this.search,
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
					return this.employeeService.getUser(
						createSearchQuery(
							this.search,
							this.sort.active,
							this.sort.direction,
							this.paginator.pageIndex,
							this.paginator.pageSize
						)
					);
				}),
				tap((employees) => {
					this.selection.clear();

					return employees;
				}),
				catchError((error, caught) => {
					return of([]);
				})
			)
			.subscribe((employees) => (this.employees = employees));
	}

	resetPageIndex() {
		this.paginator.pageIndex = 0;
	}

	deleteUser(employee: Employee) {
		this.dialog
			.open(DeleteUserModalComponent, {
				data: employee
			})
			.afterClosed()
			.subscribe(() => {
				this.updateArchive();
			});
	}

	masterToggle() {
		this.selection.selected.length
			? this.selection.clear()
			: this.employees.forEach((row) => this.selection.select(row));
	}

	deleteSelection() {
		const nSelected = this.selection.selected.length;

		if (nSelected) {
			if (
				confirm(
					'Are you sure you would like to delete ' +
						nSelected +
						' users?'
				)
			) {
				const promises = [];

				this.selection.selected.forEach((employee) => {
					promises.push(
						this.employeeService.delete(employee.id).toPromise()
					);
				});

				Promise.all(promises).then(() => this.updateArchive());
			}
		}
		else {
			alert('Please select users to delete.');
		}
	}

	openCreateUser() {
		this.dialog
			.open(CreateUserModalComponent)
			.afterClosed()
			.subscribe(() => {
				this.updateArchive();
			});
	}

	editUser(employee: Employee) {
		this.dialog
			.open(EditUserModalComponent, {
				data: employee
			})
			.afterClosed()
			.subscribe(() => {
				this.updateArchive();
			});
	}

	editSelection() {
		if (this.selection.selected.length > 1) {
			alert('Please select only one employee to edit.');
			return;
		}
		else if (this.selection.selected.length) {
			this.selection.selected.forEach((employee) => {
				this.dialog.open(EditUserModalComponent, {
					data: employee
				});
			});

			this.dialog.afterAllClosed.subscribe(() => {
				this.updateArchive();
			});
		}
		else {
			alert('Please select users to edit.');
		}
	}

	highlight(row) {
		this.selectedRowIndex = row.id;
	}

	isSelected(row) {
		return (this.selectedRowIndex = row.id);
	}
}
