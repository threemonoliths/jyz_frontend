import {DispatchForPurchaseComponent} from './dispatch_for_purchase.component';
import {DispatchForPurchaseListComponent} from './list/list.component';
import {DispatchForPurchaseFormComponent} from './form/form.component';

export const dispatchForPurchaseRoutes = [{
	path: '',
	component: DispatchForPurchaseComponent,
	children: [
		{ path: '', redirectTo: 'page', pathMatch: 'full' },
		{ path: 'page', component: DispatchForPurchaseListComponent },
		{ path: 'form', component: DispatchForPurchaseFormComponent },
	]
}];