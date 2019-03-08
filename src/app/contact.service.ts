import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { HandlerService } from './handler.service';
import { AuthService } from '../app/auth.service';
import { Contact } from './contacts';

@Injectable({
	providedIn: 'root'
})
export class ContactService {
	private url = 'http://localhost:3000/Contacts';

	constructor(
		private http: HttpClient,
		public handler: HandlerService,
		public authService: AuthService
	) {}

	//crud operations

	public post(contact: Contact): Observable<Object> {
		this.handler.showLoader();

		return this.http.post(this.url, contact).pipe(
			tap((result) => {
				this.handler.log('UserService', `POST user`, {
					body: contact,
					result: result
				});
				this.handler.hideLoader();
			}),
			catchError(this.handler.error<Contact>('UserService::post'))
		);
	}

	public getUser(params: any): Observable<Contact[]> {
		this.handler.showBackgroundLoader();

		return this.http
			.get<Contact[]>(this.url, {
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
				catchError(this.handler.error<Contact[]>('UserService::getOne'))
			);
	}

	/**
	 * Update a user
	 *
	 * @param userId User ID to update by
	 * @param data User data to update
	 */
	public update(contactId: number, data: Contact): Observable<any> {
		this.handler.showLoader();

		return this.http
			.put(`${this.url}/${contactId}`, data, {
				headers: this.authService.getHeaders(),
				observe: 'response'
			})
			.pipe(
				tap((results) => {
					this.handler.log('ContactService', `PUT (#${contactId})`, {
						contactId: contactId,
						data: data,
						results: results
					});

					this.handler.hideLoader();
				}),
				catchError(
					this.handler.error<Contact>(
						'ContactService::update',
						`PUT (#${contactId}) failed.`
					)
				)
			);
	}

	/**
	 * Delete a user
	 *
	 * @param userId User ID to delete by
	 */
	public delete(contactId: number): Observable<any> {
		this.handler.showLoader();

		return this.http
			.delete(`${this.url}/${contactId}`, {
				headers: this.authService.getHeaders(),
				observe: 'response'
			})
			.pipe(
				tap((results) => {
					this.handler.log(
						'UserService',
						`DELETE user (#${contactId})`,
						{
							contactId: contactId,
							results: results
						}
					);
					this.handler.hideLoader();
				}),
				catchError(
					this.handler.error<number>(
						'UserService::delete',
						`DELETE user (#${contactId}) failed.`
					)
				)
			);
	}
}
