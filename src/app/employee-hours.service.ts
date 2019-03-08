import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { HandlerService } from './handler.service';
import { AuthService } from '../app/auth.service';
import { EmployeeHours } from './employee-hours';

@Injectable({
	providedIn: 'root'
})
export class EmployeeHoursService {
	private url = 'http://localhost:3000/employeeHours';

	constructor(
		private http: HttpClient,
		public handler: HandlerService,
		public authService: AuthService
	) {}

	//crud operations

	public post(employeeHours: EmployeeHours): Observable<Object> {
		this.handler.showLoader();

		return this.http.post(this.url, employeeHours).pipe(
			tap((result) => {
				this.handler.log('UserService', `POST user`, {
					body: employeeHours,
					result: result
				});
				this.handler.hideLoader();
			}),
			catchError(this.handler.error<EmployeeHours>('UserService::post'))
		);
	}

	public getUser(params: any): Observable<EmployeeHours[]> {
		this.handler.showBackgroundLoader();

		return this.http
			.get<EmployeeHours[]>(this.url, {
				headers: this.authService.getHeaders(),
				params: new HttpParams({ fromObject: params })
			})
			.pipe(
				map((results) => {
					this.handler.log('UserService', 'GET user', {
						params: params,
						results: results
					});

					// Array-ify
					if (!(results instanceof Array)) {
						results = [ results ];
					}
					this.handler.hideBackgroundLoader();

					return results;
				}),
				catchError(
					this.handler.error<EmployeeHours[]>('UserService::getOne')
				)
			);
	}

	/**
	 * Update a user
	 *
	 * @param userId User ID to update by
	 * @param data User data to update
	 */
	public update(
		employeeHoursId: number,
		data: EmployeeHours
	): Observable<any> {
		this.handler.showLoader();

		return this.http
			.put(`${this.url}/${employeeHoursId}`, data, {
				headers: this.authService.getHeaders(),
				observe: 'response'
			})
			.pipe(
				tap((results) => {
					this.handler.log(
						'UserService',
						`PUT user (#${employeeHoursId})`,
						{
							userId: employeeHoursId,
							data: data,
							results: results
						}
					);
					this.handler.hideLoader();
				}),
				catchError(
					this.handler.error<EmployeeHours>(
						'UserService::update',
						`PUT user (#${employeeHoursId}) failed.`
					)
				)
			);
	}

	/**
	 * Delete a user
	 *
	 * @param userId User ID to delete by
	 */
	public delete(employeeHoursId: number): Observable<any> {
		this.handler.showLoader();

		return this.http
			.delete(`${this.url}/${employeeHoursId}`, {
				headers: this.authService.getHeaders(),
				observe: 'response'
			})
			.pipe(
				tap((results) => {
					this.handler.log(
						'UserService',
						`DELETE user (#${employeeHoursId})`,
						{
							employeeHoursId: employeeHoursId,
							results: results
						}
					);
					this.handler.hideLoader();
				}),
				catchError(
					this.handler.error<number>(
						'UserService::delete',
						`DELETE user (#${employeeHoursId}) failed.`
					)
				)
			);
	}
}
