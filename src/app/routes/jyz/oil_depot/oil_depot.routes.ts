import {OilDepotComponent} from './oil_depot.component';
import {OilDepotListComponent} from './list/list.component';
import {OilDepotFormComponent} from './form/form.component';

export const OilDepotRoutes = [{
	path: '',
	component: OilDepotComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: OilDepotListComponent },
		{ path: 'form', component: OilDepotFormComponent },
	]
}];