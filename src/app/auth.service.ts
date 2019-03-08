import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Employee } from '../app/employees';
import { HandlerService } from '../app/handler.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public cachedHeaders?: HttpHeaders;

	constructor(private http: HttpClient, private handler: HandlerService) {}

	public getHeaders(fresh: boolean = false): HttpHeaders {
		// Create headers
		this.cachedHeaders = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		return this.cachedHeaders;
	}
}
