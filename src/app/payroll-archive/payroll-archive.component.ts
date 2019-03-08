import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, merge, of } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { createSearchQuery } from 'pointy-fe/http';

import { EmployeeHoursService } from '../employee-hours.service';
import { EmployeeHours } from '../employee-hours';
import { EditHoursModalComponent } from '../edit-hours-modal/edit-hours-modal.component';
import { DeleteHoursModalComponent } from '../delete-hours-modal/delete-hours-modal.component';
import { tap, startWith, switchMap, catchError } from 'rxjs/operators';
import { Employee } from '../employees';
import { PayrollViewModalComponent } from '../payroll-view-modal/payroll-view-modal.component';

@Component({
	selector: 'app-payroll-archive',
	templateUrl: './payroll-archive.component.html',
	styleUrls: [ './payroll-archive.component.css' ]
})
export class PayrollArchiveComponent implements OnInit {
	public hours?: EmployeeHours[] = [];
	public search = '';
	public nResults = 0;
	public dataSource: MatTableDataSource<EmployeeHours>;
	public selectedRowIndex: number = -1;
	public selection: SelectionModel<EmployeeHours>;
	public markAsRead = false;

	public columns: string[] = [
		'select',
		'id',
		'startDate',
		'endDate',
		'test',
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
		'sunday',
		'totalHours'
	];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private employeeHoursService: EmployeeHoursService,
		private dialog: MatDialog
	) {}

	ngOnInit() {
		this.paginator.pageSize = 10;
		this.paginator.pageIndex = 0;
		this.sort.direction = 'desc';
		this.sort.active = 'id';

		this.selection = new SelectionModel<EmployeeHours>(true);
		this.updateArchive();
	}

	updateArchive() {
		merge(
			this.sort.sortChange,
			this.paginator.page,
			this.employeeHoursService
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
					return this.employeeHoursService.getUser(
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
			.subscribe((hours) => (this.hours = hours));
	}

	resetPageIndex() {
		this.paginator.pageIndex = 0;
	}

	deleteHours(hours: EmployeeHours) {
		this.dialog
			.open(DeleteHoursModalComponent, {
				data: hours
			})
			.afterClosed()
			.subscribe(() => {
				this.updateArchive();
			});
	}

	masterToggle() {
		this.selection.selected.length
			? this.selection.clear()
			: this.hours.forEach((row) => this.selection.select(row));
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

				this.selection.selected.forEach((hour) => {
					promises.push(
						this.employeeHoursService.delete(hour.id).toPromise()
					);
				});

				Promise.all(promises).then(() => this.updateArchive());
			}
		}
		else {
			alert('Please select users to delete.');
		}
	}

	editHours(hour: EmployeeHours) {
		this.dialog
			.open(EditHoursModalComponent, {
				data: hour
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
			this.selection.selected.forEach((hour) => {
				this.dialog.open(EditHoursModalComponent, {
					data: hour
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
}
