import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { HandlerService } from './handler.service';
import { AuthService } from '../app/auth.service';
import { Employee } from './employees';

@Injectable({
	providedIn: 'root'
})
export class EmployeeService {
	private url = 'http://localhost:3000/employees';
	constructor(
		private http: HttpClient,
		public handler: HandlerService,
		public authService: AuthService
	) {}

	//crud operations

	public post(employee: Employee): Observable<Object> {
		this.handler.showLoader();

		return this.http.post(this.url, employee).pipe(
			tap((result) => {
				this.handler.log('UserService', `POST user`, {
					body: employee,
					result: result
				});
				this.handler.hideLoader();
			}),
			catchError(this.handler.error<Employee>('UserService::post'))
		);
	}

	public getUser(params: any): Observable<Employee[]> {
		this.handler.showBackgroundLoader();

		return this.http
			.get<Employee[]>(this.url, {
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
					this.handler.error<Employee[]>('UserService::getOne')
				)
			);
	}

	/**
	 * Update a user
	 *
	 * @param userId User ID to update by
	 * @param data User data to update
	 */
	public update(employeeId: number, data: Employee): Observable<any> {
		this.handler.showLoader();

		return this.http
			.put(`${this.url}/${employeeId}`, data, {
				headers: this.authService.getHeaders(),
				observe: 'response'
			})
			.pipe(
				tap((results) => {
					this.handler.log(
						'UserService',
						`PUT user (#${employeeId})`,
						{
							userId: employeeId,
							data: data,
							results: results
						}
					);
					this.handler.hideLoader();
				}),
				catchError(
					this.handler.error<Employee>(
						'UserService::update',
						`PUT user (#${employeeId}) failed.`
					)
				)
			);
	}

	/**
	 * Delete a user
	 *
	 * @param userId User ID to delete by
	 */
	public delete(employeeId: number): Observable<any> {
		this.handler.showLoader();

		return this.http
			.delete(`${this.url}/${employeeId}`, {
				headers: this.authService.getHeaders(),
				observe: 'response'
			})
			.pipe(
				tap((results) => {
					this.handler.log(
						'UserService',
						`DELETE user (#${employeeId})`,
						{
							employeeId: employeeId,
							results: results
						}
					);
					this.handler.hideLoader();
				}),
				catchError(
					this.handler.error<number>(
						'UserService::delete',
						`DELETE user (#${employeeId}) failed.`
					)
				)
			);
	}
}
