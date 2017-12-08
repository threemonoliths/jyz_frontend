import {OilTransferComponent} from './oil_transfer.component';
import {OilTransferListComponent} from './list/list.component';
import {OilTransferFormComponent} from './form/form.component';

export const oilTransferRoutes = [{
	path: '',
	component: OilTransferComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: OilTransferListComponent },
		{ path: 'form', component: OilTransferFormComponent },
	]
}];