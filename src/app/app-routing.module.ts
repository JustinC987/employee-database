import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { ContactArchiveComponent } from './contact-archive/contact-archive.component';
import { PayrollArchiveComponent } from './payroll-archive/payroll-archive.component';

// Components

const routes: Routes = [
	{
		path: 'contacts',
		component: ContactArchiveComponent
	},

	{
		path: 'hours',
		component: PayrollArchiveComponent
	},

	{
		path: 'users',
		component: EmployeeTableComponent
	},

	{
		path: 'home',
		component: HomeComponent
	},

	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
