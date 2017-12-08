import {GodownentryForAcceptanceComponent} from './godownentry_for_acceptance.component';
import {GodownentryForAcceptanceListComponent} from './list/list.component';
import {GodownentryForAcceptanceFormComponent} from './form/form.component';

export const godownentryForAcceptanceRoutes = [{
	path: '',
	component: GodownentryForAcceptanceComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: GodownentryForAcceptanceListComponent },
		{ path: 'form', component: GodownentryForAcceptanceFormComponent },
	]
}];