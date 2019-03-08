import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MatTableModule,
	MatCheckboxModule,
	MatDialogModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatPaginatorModule,
	MatSortModule,
	MatMenuModule,
	MatProgressSpinnerModule,
	MatProgressBarModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeeService } from './employee-service';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { CreateUserModalComponent } from './create-user-modal/create-user-modal.component';
import { DeleteUserModalComponent } from './delete-user-modal/delete-user-modal.component';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { HomeComponent } from './home/home.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { ContactArchiveComponent } from './contact-archive/contact-archive.component';
import { DeleteContactModalComponent } from './delete-contact-modal/delete-contact-modal.component';
import { ViewContactModalComponent } from './view-contact-modal/view-contact-modal.component';
import { EmployeeHoursModalComponent } from './employee-hours-modal/employee-hours-modal.component';
import { PayrollArchiveComponent } from './payroll-archive/payroll-archive.component';
import { EditHoursModalComponent } from './edit-hours-modal/edit-hours-modal.component';
import { DeleteHoursModalComponent } from './delete-hours-modal/delete-hours-modal.component';
import { PayrollViewModalComponent } from './payroll-view-modal/payroll-view-modal.component';

@NgModule({
	declarations: [
		AppComponent,
		EmployeeTableComponent,
		EmployeeRegistrationComponent,
		PageNotFoundComponent,
		HeaderComponent,
		FooterComponent,
		ErrorModalComponent,
		CreateUserModalComponent,
		DeleteUserModalComponent,
		EditUserModalComponent,
		HomeComponent,
		SuccessModalComponent,
		ContactModalComponent,
		ContactArchiveComponent,
		DeleteContactModalComponent,
		ViewContactModalComponent,
		EmployeeHoursModalComponent,
		PayrollArchiveComponent,
		EditHoursModalComponent,
		DeleteHoursModalComponent,
		PayrollViewModalComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatTableModule,
		MatCheckboxModule,
		FormsModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatPaginatorModule,
		MatSortModule,
		MatMenuModule,
		MatProgressSpinnerModule,
		MatProgressBarModule
	],
	providers: [ EmployeeService ],
	bootstrap: [ AppComponent ],
	exports: [ MatDialogModule ],
	entryComponents: [
		ErrorModalComponent,
		CreateUserModalComponent,
		DeleteUserModalComponent,
		EditUserModalComponent,
		SuccessModalComponent,
		ContactModalComponent,
		DeleteContactModalComponent,
		ViewContactModalComponent,
		EmployeeHoursModalComponent,
		DeleteHoursModalComponent
	]
})
export class AppModule {}
